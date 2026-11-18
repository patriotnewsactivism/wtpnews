import os, time
from obs_common import client
c = client()
if not c.get_replay_buffer_status().output_active:
    c.start_replay_buffer(); time.sleep(3)
c.save_replay_buffer(); time.sleep(2)
p = c.get_last_replay_buffer_replay().saved_replay_path
print("CLIP SAVED:", p, (os.path.getsize(p) if os.path.exists(p) else "missing"), "bytes")
