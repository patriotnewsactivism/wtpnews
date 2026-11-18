from obs_common import client
c = client(); v = c.get_version()
print("OBS", v.obs_version, "ws", v.obs_web_socket_version)
print("profile", c.get_profile_list().current_profile_name)
mode = c.get_profile_parameter("Output","Mode").parameter_value
print("output mode", mode)
for cat,n in [("SimpleOutput","RecRB"),("SimpleOutput","RecRBTime"),("AdvOut","RecRB"),("AdvOut","RecRBTime")]:
    print(cat,n,c.get_profile_parameter(cat,n).parameter_value)
print("replay active", c.get_replay_buffer_status().output_active)
print("streaming", c.get_stream_status().output_active, "recording", c.get_record_status().output_active)
