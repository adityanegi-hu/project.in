"""
Common project artifacts generator.
Generates standard README.md documentation and attaches themed CSS stylesheet.
"""

from typing import List, Dict, Any
from ..models import CodeFile
from ..css import generate_project_css


def generate_readme(proj: Dict[str, Any]) -> CodeFile:
    """Generates standard IEEE-aligned academic project README."""
    t = proj["title"]
    y_lbl = proj["yearLabel"]
    degs = ", ".join(proj["degrees"])
    tech_str = ", ".join(proj["techStack"])

    return {
        "filename": "README.md",
        "language": "markdown",
        "code": f"""# {t}
Academic project for **{y_lbl}** ({degs}).

## Tech Stack
- {tech_str}

## Project Structure
- `frontend/index.html` - Interactive User Interface
- `frontend/styles.css` - Custom Theme & Responsive Glassmorphism Styling
- `frontend/app.js` - Interactive Client-Side Execution Controller
- `backend/` or `src/` or `contracts/` - Domain Processing Services
- `database/schema.sql` - Complete Relational Database Tables
"""
    }


def attach_common_files(proj: Dict[str, Any], files: List[CodeFile]) -> List[CodeFile]:
    """Appends themed frontend stylesheet and README to the project files."""
    files.append({
        "filename": "frontend/styles.css",
        "language": "css",
        "code": generate_project_css(proj)
    })
    files.append(generate_readme(proj))
    return files
