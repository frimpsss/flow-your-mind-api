#!/bin/bash

echo "Enter migrate message"
read migrate_message

npx prisma migrate dev --name "$migrate_message"