import yt_dlp
import subprocess
import wave
import os

DOWNLOAD_DIR = 'downloads'
os.makedirs(DOWNLOAD_DIR, exist_ok=True)

# Path to ffmpeg binary in project bin directory
FFMPEG_EXE = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'bin', 'ffmpeg.exe')

def download_youtube_audio(url: str) -> str:
    """Download audio from YouTube and convert to WAV format."""
    output_path = os.path.join(DOWNLOAD_DIR, '%(title)s.%(ext)s')
    ydl_opts = {
        "format": "bestaudio/best",
        "outtmpl": output_path,
        "quiet": True,
    }
    # Step 1: Download raw audio (no postprocessing needed)
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=True)
        raw_file = ydl.prepare_filename(info)

    # Step 2: Convert to WAV using ffmpeg directly (no ffprobe needed)
    wav_file = os.path.splitext(raw_file)[0] + ".wav"
    subprocess.run([
        FFMPEG_EXE,
        "-i", raw_file,       # input file
        "-ac", "1",            # mono
        "-ar", "16000",        # 16kHz sample rate
        "-y",                  # overwrite if exists
        wav_file
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    # Remove the original raw file
    if os.path.exists(raw_file) and raw_file != wav_file:
        os.remove(raw_file)

    return wav_file

def convert_to_wav(input_path: str) -> str:
    """Convert any local audio/video file to WAV format using ffmpeg."""
    wav_file = os.path.join(DOWNLOAD_DIR, os.path.splitext(os.path.basename(input_path))[0] + ".wav")
    subprocess.run([
        FFMPEG_EXE,
        "-i", input_path,      # input file
        "-ac", "1",             # mono
        "-ar", "16000",         # 16kHz sample rate
        "-y",                   # overwrite if exists
        wav_file
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    return wav_file

def chunk_audio(wav_path: str, chunk_minutes: int = 10) -> list:
    """Split a WAV file into chunks of specified duration."""
    with wave.open(wav_path, 'rb') as wf:
        n_channels = wf.getnchannels()
        sample_width = wf.getsampwidth()
        frame_rate = wf.getframerate()
        total_frames = wf.getnframes()

        chunk_frames = chunk_minutes * 60 * frame_rate
        chunks = []
        i = 0

        while wf.tell() < total_frames:
            frames_to_read = min(chunk_frames, total_frames - wf.tell())
            data = wf.readframes(frames_to_read)

            chunk_path = f"{os.path.splitext(wav_path)[0]}_chunk_{i}.wav"
            with wave.open(chunk_path, 'wb') as chunk_wf:
                chunk_wf.setnchannels(n_channels)
                chunk_wf.setsampwidth(sample_width)
                chunk_wf.setframerate(frame_rate)
                chunk_wf.writeframes(data)

            chunks.append(chunk_path)
            i += 1

    return chunks


def process_input(source: str) -> list:
    if source.startswith("http://") or source.startswith("https://"):
        print("Detected YouTube URL. Downloading audio...")
        wav_path = download_youtube_audio(source)
    else:
        print("Detected local file. Converting to WAV...")
        wav_path = convert_to_wav(source)

    print("Chunking audio...")
    chunks = chunk_audio(wav_path)
    print(f"Audio ready — {len(chunks)} chunk(s) created.")
    return chunks