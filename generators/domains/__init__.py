"""
Domain Generator Registry.
Maps each domain category ID to its dedicated code generator function.
"""

from typing import Dict, Callable, List, Any
from ..models import CodeFile
from .aiml import generate_aiml_files
from .iot import generate_iot_files
from .cpp import generate_cpp_files
from .python_data import generate_python_data_files
from .web_dev import generate_web_dev_files
from .java import generate_java_files
from .mobile import generate_mobile_files
from .blockchain import generate_blockchain_files
from .cybersecurity import generate_cybersecurity_files
from .fallback import generate_fallback_files
from .common import attach_common_files


DOMAIN_GENERATORS: Dict[str, Callable[[Dict[str, Any]], List[CodeFile]]] = {
    "ai-ml": generate_aiml_files,
    "iot-embedded": generate_iot_files,
    "c-cpp": generate_cpp_files,
    "python-data": generate_python_data_files,
    "web-dev": generate_web_dev_files,
    "java": generate_java_files,
    "mobile": generate_mobile_files,
    "blockchain": generate_blockchain_files,
    "cybersecurity": generate_cybersecurity_files,
}


def generate_full_code_files(proj: Dict[str, Any]) -> List[CodeFile]:
    """
    Generates all source code files for a given project based on its domain.
    Automatically attaches themed CSS styles and README documentation.
    """
    cat = proj.get("category", "")
    generator = DOMAIN_GENERATORS.get(cat, generate_fallback_files)
    files = generator(proj)
    return attach_common_files(proj, files)
