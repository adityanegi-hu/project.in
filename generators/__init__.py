"""
ProjectForge Generator Package.
Provides modular, clean, and typed project generators for 450 engineering projects.
"""

from .models import CodeFile, Slide, Synopsis, VivaQuestion, ProjectMeta, FullProject
from .catalog import PROJECTS_BY_DOMAIN, DOMAIN_META_MAP, YEAR_LABELS, PROJECTS_META, build_projects_metadata
from .css import generate_project_css, THEME_PALETTES
from .slides import generate_presentation_slides
from .domains import generate_full_code_files, DOMAIN_GENERATORS
from .builder import build_full_project, generate_data_files

# Backwards compatibility alias
projects_meta = PROJECTS_META

__all__ = [
    "CodeFile",
    "Slide",
    "Synopsis",
    "VivaQuestion",
    "ProjectMeta",
    "FullProject",
    "PROJECTS_BY_DOMAIN",
    "DOMAIN_META_MAP",
    "YEAR_LABELS",
    "PROJECTS_META",
    "projects_meta",
    "build_projects_metadata",
    "THEME_PALETTES",
    "generate_project_css",
    "generate_presentation_slides",
    "generate_full_code_files",
    "DOMAIN_GENERATORS",
    "build_full_project",
    "generate_data_files",
]
