#!/usr/bin/env python3

import argparse
from math import gcd
from pathlib import Path

from PIL import Image, UnidentifiedImageError


def reduced_dimensions(width: int, height: int) -> tuple[int, int]:
    d = gcd(width, height)
    return width // d, height // d


def iter_images(directory: Path):
    for entry in sorted(directory.iterdir(), key=lambda p: p.name):
        if entry.is_file():
            yield entry


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("directory", help="Directory containing images (non-recursive)")
    args = parser.parse_args()

    directory = Path(args.directory)
    if not directory.exists() or not directory.is_dir():
        raise SystemExit(f"Not a valid directory: {directory}")

    for image_path in iter_images(directory):
        try:
            with Image.open(image_path) as img:
                width, height = img.size
        except (UnidentifiedImageError, OSError):
            continue

        reduced_width, reduced_height = reduced_dimensions(width, height)
        print(
            f'{{ src: "{image_path.name}", height: {reduced_height}, width: {reduced_width} }},'
        )


if __name__ == "__main__":
    main()
