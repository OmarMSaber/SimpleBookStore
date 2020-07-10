#!/usr/bin/env bash
set -e

# update instance
yum -y update

yum -y install nodejs #default-jre ImageMagick
