#!/bin/bash
#CI=tru to stop test when finish
CI=true npm run test --detectOpenHandles
exit 0