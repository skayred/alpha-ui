#!/bin/bash
npm run build
docker build -t skayred/alpha-ui:0.0.1 .
