import socket
import subprocess
import argparse


with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
    s.connect(("8.8.8.8", 80))
    ip = s.getsockname()[0]


base_commands = ["hugo server"]
simple_options = [
    "--printPathWarnings", 
    "--printMemoryUsage",
    "--printI18nWarnings",
    "--disableFastRender",
    "--cleanDestinationDir",
    "--gc",
    "--minify",
    "--logLevel debug"
]
net_options = [
    "--baseURL http://" + str(ip),
    "--bind 0.0.0.0"
]


parser = argparse.ArgumentParser(description="启动Hugo本地服务器")
group = parser.add_mutually_exclusive_group()
group.add_argument("--lan", action="store_true")
group.add_argument("--local", action="store_true")
args = parser.parse_args()

if args.lan:
    command = " ".join(base_commands + simple_options + net_options)
    subprocess.run(command, shell=True)
else:
    command = " ".join(base_commands + simple_options)
    subprocess.run(command, shell=True)