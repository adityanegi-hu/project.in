"""
Data models and type definitions for ProjectForge project generators.
Provides type safety, schema clarity, and clean IDE autocompletion.
"""

from typing import TypedDict, List


class CodeFile(TypedDict):
    """Represents a generated source code or configuration file."""
    filename: str
    language: str
    code: str


class Slide(TypedDict):
    """Represents a single academic presentation slide."""
    slideNumber: int
    type: str
    title: str
    subtitle: str
    bullets: List[str]
    notes: str
    speakerNotes: str


class SystemRequirements(TypedDict):
    """Hardware and software requirements specification."""
    hardware: str
    software: str


class Synopsis(TypedDict):
    """IEEE-aligned project synopsis document."""
    abstract: str
    objectives: List[str]
    existingSystemIssues: List[str]
    proposedSystemAdvantages: List[str]
    systemRequirements: SystemRequirements


class VivaQuestion(TypedDict):
    """Viva voce evaluation question with expected response."""
    question: str
    answer: str


class ProjectMeta(TypedDict):
    """Core metadata identifying a project across categories and academic streams."""
    id: str
    year: int
    yearLabel: str
    difficulty: str
    title: str
    tagline: str
    degrees: List[str]
    category: str
    categoryLabel: str
    techStack: List[str]
    icon: str
    color: str
    badge: str
    rating: float
    downloads: int
    stars: int


class FullProject(ProjectMeta):
    """Complete project bundle including source code, presentation, synopsis, and viva Q&A."""
    synopsis: Synopsis
    slides: List[Slide]
    codeFiles: List[CodeFile]
    vivaQuestions: List[VivaQuestion]
