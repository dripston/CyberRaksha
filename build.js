#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';

console.log('🚀 Starting CyberRaksha build process...');

// Ensure we have node_modules
if (!existsSync('node_modules')) {
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
}

// Ensure build directories exist
if (!existsSync('public')) {
  mkdirSync('public', { recursive: true });
}
if (!existsSync('api')) {
  mkdirSync('api', { recursive: true });
}

try {
  // Build frontend using npx to ensure vite is found
  console.log('🔨 Building frontend...');
  execSync('npx vite build --config vite.config.js', { 
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });

  // Build backend using npx to ensure esbuild is found
  console.log('⚙️ Building backend...');
  execSync('npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=api', {
    stdio: 'inherit'
  });

  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
