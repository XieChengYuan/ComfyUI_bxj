import sys
import os
import subprocess

DEBUG = True

def get_project_root():
    """Returns the root directory of the project."""
    return os.path.dirname(os.path.abspath(__file__))

def build_pip_install_cmd(args):
    """
    Builds the pip install command based on the Python executable.
    Adjusts the command for embedded Python environments if necessary.
    """
    pip_cmd = [sys.executable, '-m', 'pip', 'install']
    if "python_embeded" in sys.executable or "python_embedded" in sys.executable:
        pip_cmd.insert(1, '-s')
    return pip_cmd + args

def install_requirements():
    """
    Installs the required packages from the requirements.txt file.
    """
    project_root = get_project_root()
    requirements_file = os.path.join(project_root, 'requirements.txt')
    
    if not os.path.isfile(requirements_file):
        raise FileNotFoundError(f"{requirements_file} does not exist.")
    
    pip_cmd = build_pip_install_cmd(['-r', 'requirements.txt'])
    result = subprocess.run(pip_cmd, cwd=project_root)
    
    if result.returncode != 0:
        raise RuntimeError(f"Failed to install packages from {requirements_file}.")
    else:
        print("All required packages installed successfully.")
if DEBUG:
    print("**********comfyui_cpm_setup**************")
install_requirements()