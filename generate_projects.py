"""
ProjectForge Master Generator Entrypoint
Compiles 450 verified working projects across 9 engineering domains.
Produces lightweight catalog index (js/data-summary.js), on-demand project details (js/data-details.json),
and handles local/cloud MongoDB persistence.
"""

import argparse
import sys
import time

from generators import (
    PROJECTS_BY_DOMAIN,
    DOMAIN_META_MAP,
    YEAR_LABELS,
    PROJECTS_META,
    projects_meta,
    generate_project_css,
    generate_presentation_slides,
    generate_full_code_files,
    build_full_project,
    generate_data_files,
    FullProject,
    ProjectMeta,
)


def print_banner(total_projects: int, domains_count: int) -> None:
    """Displays an informative CLI startup banner."""
    print("=" * 72)
    print("   PROJECTFORGE MASTER GENERATOR (Modular Engine v2.0)")
    print(f"   Compiling {total_projects} projects across {domains_count} technical domains")
    print("=" * 72)


def main() -> int:
    """CLI execution entrypoint for ProjectForge data generator."""
    parser = argparse.ArgumentParser(
        description="ProjectForge Catalog & Source Code Generator",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter,
    )
    parser.add_argument(
        "--output-dir",
        default="js",
        help="Target directory for generated data-summary.js and data-details.json",
    )
    parser.add_argument(
        "--skip-mongo",
        action="store_true",
        help="Skip local MongoDB upsert synchronization",
    )
    parser.add_argument(
        "--stats",
        action="store_true",
        help="Display detailed domain and academic year distribution metrics",
    )

    args = parser.parse_args()

    start_time = time.time()
    print_banner(len(PROJECTS_META), len(DOMAIN_META_MAP))

    # Generate data distribution files
    results = generate_data_files(
        output_dir=args.output_dir,
        projects_meta=PROJECTS_META,
        sync_mongo=not args.skip_mongo,
    )

    elapsed = time.time() - start_time
    print("-" * 72)
    print(f"Generation completed successfully in {elapsed:.2f}s!")
    print(f"MongoDB Status: {results['mongo_status']}")

    if args.stats:
        print("\nDomain Distribution:")
        for dom, count in results["domain_distribution"].items():
            print(f"  - {dom:<16}: {count} projects")
        print("\nYear Distribution:")
        for yr, count in results["year_distribution"].items():
            print(f"  - Year {yr:<13}: {count} projects")
        print("-" * 72)

    return 0


if __name__ == "__main__":
    sys.exit(main())
