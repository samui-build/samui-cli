#!/usr/bin/env node  --disable-warning=ExperimentalWarning

import { execute } from '@oclif/core'

await execute({ dir: import.meta.url })
