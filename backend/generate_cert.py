#!/usr/bin/env python3
"""
Generate self-signed SSL certificate for development
"""

import subprocess
import sys
import os

def generate_self_signed_cert():
    """Generate self-signed SSL certificate for development"""
    try:
        # Check if OpenSSL is available
        subprocess.run(["openssl", "version"], check=True, capture_output=True)
        
        print("Generating self-signed SSL certificate for development...")
        
        # Generate private key
        subprocess.run([
            "openssl", "genrsa", 
            "-out", "key.pem", 
            "2048"
        ], check=True)
        
        # Generate certificate
        subprocess.run([
            "openssl", "req", 
            "-new", "-x509", 
            "-key", "key.pem", 
            "-out", "cert.pem", 
            "-days", "365",
            "-subj", "/C=US/ST=State/L=City/O=Organization/CN=localhost"
        ], check=True)
        
        print("✅ SSL certificate generated successfully!")
        print("Files created:")
        print("  - cert.pem (certificate)")
        print("  - key.pem (private key)")
        print()
        print("⚠️  WARNING: This is a self-signed certificate for development only!")
        print("   Your browser will show a security warning. Click 'Advanced' and 'Proceed to localhost'")
        
    except subprocess.CalledProcessError as e:
        print(f"❌ Error generating certificate: {e}")
        print("Make sure OpenSSL is installed on your system")
        sys.exit(1)
    except FileNotFoundError:
        print("❌ OpenSSL not found. Please install OpenSSL:")
        print("  - Windows: Download from https://slproweb.com/products/Win32OpenSSL.html")
        print("  - macOS: brew install openssl")
        print("  - Linux: sudo apt-get install openssl (Ubuntu/Debian)")
        sys.exit(1)

if __name__ == "__main__":
    generate_self_signed_cert()