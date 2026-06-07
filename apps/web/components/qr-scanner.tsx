"use client";

import { Button } from "@workspace/ui/components/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@workspace/ui/components/dialog";
import { Html5Qrcode } from "html5-qrcode";
import { QrCode, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface QRScannerProps {
  onScan: (userId: string) => Promise<void>;
}

export function QRScanner({ onScan }: QRScannerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        try {
          const state = scannerRef.current.getState();
          if (state === 2 || state === 3) {
            scannerRef.current.stop().catch(() => {});
          }
        } catch {
        }
        try {
          scannerRef.current.clear();
        } catch {
        }
        scannerRef.current = null;
      }
    };
  }, []);

  const startScanning = async () => {
    const element = document.getElementById("qr-reader");
    if (!element) {
      toast.error("فشل في العثور على عنصر المسح");
      return;
    }

    if (!scannerRef.current) {
      scannerRef.current = new Html5Qrcode("qr-reader");
    }

    try {
      setIsScanning(true);
      await scannerRef.current.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        async (decodedText) => {
          try {
            await stopScanning();
            await onScan(decodedText);
            setIsOpen(false);
            toast.success("تم إضافة الصديق بنجاح");
          } catch (error: any) {
            const errorMessage = error?.message || "حدث خطأ أثناء إضافة الصديق";
            toast.error(errorMessage);
            await stopScanning();
            setIsOpen(false);
          }
        },
        () => {},
      );
    } catch (error) {
      setIsScanning(false);
      toast.error("فشل في بدء الكاميرا");
      if (scannerRef.current) {
        try {
          const state = scannerRef.current.getState();
          if (state === 2 || state === 3) {
            await scannerRef.current.stop();
          }
        } catch {
        }
        try {
          scannerRef.current.clear();
        } catch {
        }
      }
    }
  };

  const stopScanning = async () => {
    if (!scannerRef.current) {
      setIsScanning(false);
      return;
    }

    try {
      const state = scannerRef.current.getState();
      if (state === 2 || state === 3) {
        await scannerRef.current.stop();
      }
    } catch (error: any) {
      const errorMessage = error?.message || "";
      if (!errorMessage.includes("not running") && !errorMessage.includes("not paused")) {
        console.error("Error stopping scanner:", error);
      }
    }

    try {
      scannerRef.current.clear();
    } catch {
    }

    setIsScanning(false);
  };

  const handleOpenChange = async (open: boolean) => {
    setIsOpen(open);
    if (!open && scannerRef.current) {
      await stopScanning();
    } else if (open) {
      setTimeout(() => {
        const element = document.getElementById("qr-reader");
        if (element) {
          startScanning();
        } else {
          setTimeout(() => startScanning(), 200);
        }
      }, 300);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="default" size="lg" className="gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold shadow-lg mx-auto">
          <QrCode className="w-5 h-5" />
          <span >مسح QR Code</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>مسح QR Code لإضافة صديق</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div ref={containerRef} className="relative w-full min-h-60">
            <div id="qr-reader" className="w-full rounded-lg overflow-hidden"></div>
            {isScanning && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                <div className="text-white text-center">
                  <p className="mb-2">جارٍ المسح...</p>
                  <p className="text-sm text-white/70">وجه الكاميرا نحو QR Code</p>
                </div>
              </div>
            )}
          </div>
          <Button variant="outline" onClick={() => handleOpenChange(false)} className="w-full gap-2">
            <X className="w-4 h-4" />
            إلغاء
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
