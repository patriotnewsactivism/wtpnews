import os, sys, time, obsws_python as obs
def client():
    pw = os.environ.get("OBS_WS_PASSWORD")
    if not pw:
        import winreg
        k = winreg.OpenKey(winreg.HKEY_CURRENT_USER, "Environment"); pw = winreg.QueryValueEx(k, "OBS_WS_PASSWORD")[0]
    return obs.ReqClient(host="127.0.0.1", port=4455, password=pw, timeout=5)
