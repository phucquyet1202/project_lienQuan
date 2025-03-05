"use client";
import React, { useState, useRef, useEffect } from "react";
import { Card, Image, Button } from "@nextui-org/react";
import ListAccgame from "./listAccgame";

const DetailAccGame = () => {
  const images = [
    "https://heroui.com/images/hero-card-complete.jpeg",
    "https://heroui.com/images/hero-card-complete.jpeg",
    "https://heroui.com/images/hero-card-complete.jpeg",
    "https://heroui.com/images/hero-card-complete.jpeg",
    "https://heroui.com/images/hero-card-complete.jpeg",
    "https://heroui.com/images/hero-card-complete.jpeg",
    "https://heroui.com/images/hero-card-complete.jpeg",
    "https://heroui.com/images/hero-card-complete.jpeg",
    "https://heroui.com/images/hero-card-complete.jpeg",
    "https://heroui.com/images/hero-card-complete.jpeg",
    "https://heroui.com/images/hero-card-complete.jpeg",
    "https://heroui.com/images/hero-card-complete.jpeg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const thumbnailRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const isMouseInThumbnail = useRef(false);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? images.length - 1 : prevIndex - 1;
      scrollThumbnailTo(newIndex);
      return newIndex;
    });
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => {
      const newIndex = prevIndex === images.length - 1 ? 0 : prevIndex + 1;
      scrollThumbnailTo(newIndex);
      return newIndex;
    });
  };

  const handleThumbnailClick = (index: any) => {
    setCurrentImageIndex(index);
    scrollThumbnailTo(index);
  };

  const startDragging = (e: any) => {
    if (e.button !== 0 || !isMouseInThumbnail.current) return;
    isDragging.current = true;
    startX.current = e.clientX;
    if (thumbnailRef.current) {
      scrollLeft.current = thumbnailRef.current.scrollLeft;
    }
    if (thumbnailRef.current) {
      thumbnailRef.current.style.cursor = "grabbing";
    }
    e.preventDefault();

    window.addEventListener("mousemove", handleDragging);
    window.addEventListener("mouseup", stopDragging);
  };

  const stopDragging = () => {
    isDragging.current = false;
    if (thumbnailRef.current) {
      thumbnailRef.current.style.cursor = "grab";
    }

    window.removeEventListener("mousemove", handleDragging);
    window.removeEventListener("mouseup", stopDragging);
  };

  const handleDragging = (e: any) => {
    if (!isDragging.current) return;
    const x = e.clientX;
    const walk = (x - startX.current) * 1.5;
    if (thumbnailRef.current) {
      thumbnailRef.current.scrollLeft = scrollLeft.current - walk;
    }
  };

  const scrollThumbnailTo = (index: number) => {
    const thumbnail = thumbnailRef.current;
    if (thumbnail) {
      const thumbnailWidth =
        thumbnail.children[index].getBoundingClientRect().width;
      const scrollOffset =
        index * thumbnailWidth - thumbnail.offsetWidth / 2 + thumbnailWidth / 2;
      thumbnail.scrollTo({ left: scrollOffset, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const thumbnail = thumbnailRef.current;

    const handleMouseEnter = () => {
      isMouseInThumbnail.current = true;
    };

    const handleMouseLeave = () => {
      isMouseInThumbnail.current = false;
    };

    if (thumbnail) {
      thumbnail.addEventListener("mousedown", startDragging);
      thumbnail.addEventListener("mouseenter", handleMouseEnter);
      thumbnail.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (thumbnail) {
        thumbnail.removeEventListener("mousedown", startDragging);
        thumbnail.removeEventListener("mouseenter", handleMouseEnter);
        thumbnail.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        padding: "20px",
      }}
    >
      <div style={{ flex: "1 1 60%", minWidth: "300px" }}>
        <Card
          style={{
            padding: "20px",
            borderRadius: "10px",
            position: "relative",
          }}
        >
          <div style={{ position: "relative" }}>
            <Image
              src={images[currentImageIndex]}
              alt="Main image"
              width="100%"
              height={300}
              style={{ borderRadius: "10px" }}
            />
            <Button
              style={{
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
                zIndex: 10,
                background: "rgba(0, 0, 0, 0.3)",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={handlePrevImage}
            >
              {"<"}
            </Button>
            <Button
              style={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
                zIndex: 10,
                background: "rgba(0, 0, 0, 0.3)",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={handleNextImage}
            >
              {">"}
            </Button>
          </div>

          <div
            ref={thumbnailRef}
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "15px",
              overflowX: "auto",
              whiteSpace: "nowrap",
              paddingBottom: "5px",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              cursor: "grab",
            }}
          >
            {images.map((src, index) => (
              <div
                key={index}
                style={{
                  flex: "0 0 auto",
                }}
              >
                <Image
                  src={src}
                  alt={`Thumbnail ${index + 1}`}
                  width={173}
                  height={100}
                  style={{
                    borderRadius: "10px",
                    cursor: "pointer",
                    border:
                      currentImageIndex === index
                        ? "2px solid #0070f3"
                        : "1px solid #ccc",
                  }}
                  onClick={() => handleThumbnailClick(index)}
                />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div style={{ flex: "1 1 35%", minWidth: "300px" }}>
        <Card style={{ padding: "20px", borderRadius: "10px" }}>
          <div>
            <p>Nick Liên Quân Giá Rẻ</p>
            <p color="gray" style={{ marginBottom: "10px" }}>
              Mã số: #6VMLL73XL6
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <div>
                <p>Trắng thông tin</p>
                <p>Số Skin</p>
                <p>Số Tướng</p>
              </div>
              <div>
                <p>90-120</p>
                <p>150-180</p>
              </div>
            </div>
            <p color="pink" style={{ margin: "20px 0" }}>
              2,400,000đ
            </p>
            <Button
              style={{
                background: "#0070f3",
                color: "white",
                width: "100%",
                padding: "10px",
                fontSize: "16px",
              }}
            >
              Mua ngay
            </Button>
          </div>
        </Card>
      </div>
      <div>
        <h3 className="font-bold text-xl py-4">
          Tài khoản Tài khoản game liên quan
        </h3>
        <ListAccgame />
      </div>
    </div>
  );
};

export default DetailAccGame;
