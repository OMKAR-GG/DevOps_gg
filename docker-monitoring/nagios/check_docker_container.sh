#!/bin/bash
container_name=$1
status=$(docker inspect -f '{{.State.Running}}' "$container_name" 2>/dev/null)
if [ "$status" == "true" ]; then
  echo "OK - Container $container_name is running."
  exit 0
else
  echo "CRITICAL - Container $container_name is not running."
  exit 2
fi
