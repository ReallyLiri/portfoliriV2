import os
import sys
from fractions import Fraction

from PIL import Image
from imgurpython import ImgurClient

# PRECONDITIONS: pip3 install imgurpython pillow

client_id = '781fa4d6e460abd'
client_secret = '5b1b67e6eb340e851d3e43bd845c02ac5fc2c6e0'

client = ImgurClient(client_id, client_secret)


def _fix_dimensions(width, height):
    ratio = width / height
    fraction = Fraction(ratio)
    fraction = fraction.limit_denominator(100)
    width, height = fraction.numerator, fraction.denominator
    return width, height


def upload_bulk():
    """upload new album, expected arg: <local dir path>"""
    input_dir = os.path.expanduser(sys.argv[1])

    for img in os.listdir(input_dir):
        path = f'{input_dir}/{img}'
        try:
            url = client.upload_from_path(path)
        except Exception as ex:
            print(client.credits)
            raise
        with Image.open(path) as img_data:
            width, height = img_data.size
            width, height = _fix_dimensions(width, height)

        print(f'{{"src": "{url}", "height": {height}, "width": {width}}},')


def list_album():
    """query existing album, expected arg: <imgur album id>, i.e FCKT6Zs"""
    album_id = sys.argv[1]

    album = client.get_album(album_id)
    for image in album.images:
        width, height = image['width'], image['height']
        ratio = width / height
        fraction = Fraction(ratio)
        fraction = fraction.limit_denominator(100)
        width, height = fraction.numerator, fraction.denominator
        print(f'{{"src": "{image["link"]}", "height": {height}, "width": {width}}},')


if __name__ == "__main__":
    # upload_bulk()
    list_album()
