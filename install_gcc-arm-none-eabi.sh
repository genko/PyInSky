#! /bin/sh

# the destination of the extracted compiler
DEST_DIR="gcc-arm-none-eabi"
# update this SOURCE in case of compiler updates
# other plattforms are linked here https://developer.arm.com/tools-and-software/open-source-software/developer-tools/gnu-toolchain/gnu-rm/downloads, too.
SOURCE="https://armkeil.blob.core.windows.net/developer/Files/downloads/gnu-rm/9-2019q4/RC2.1/gcc-arm-none-eabi-9-2019-q4-major-x86_64-linux.tar.bz2"


echo "Download $SOURCE"
curl $SOURCE -o "$DEST_DIR.tar.bz2"

echo "Extract Archive"
mkdir -p $DEST_DIR
tar -xf "$DEST_DIR.tar.bz2" -C $DEST_DIR --strip-components=1

echo "Move Archive"
mv "$DEST_DIR.tar.bz2" $DEST_DIR
