"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { FaBirthdayCake, FaGift } from "react-icons/fa";
import { GiBalloons } from "react-icons/gi";

type ConfettiProps = {
  width: number;
  height: number;
};

const DynamicConfetti = dynamic(() => import("react-confetti"), { ssr: false });

const candleColors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8"];
const balloonColors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8"];
const confettiColors = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#FFA07A",
  "#98D8C8",
  "#F7DC6F",
  "#BB8FCE",
];

export default function BirthdayWish() {
  const [candlesLit, setCandlesLit] = useState<number>(0);
  const [balloonsPop, setBalloonsPop] = useState<number>(0);
  const [celebrating, setCelebrating] = useState<boolean>(false);
  const [confetti, setConfetti] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState<ConfettiProps>({
    width: 0,
    height: 0,
  });

  const [showCard, setShowCard] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<string>();
  

  const createCard = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowCard(true);
  };

  const totalcandles: number = 5;
  const totalBalloons: number = 5;

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (candlesLit === totalcandles && balloonsPop === totalBalloons) {
      setConfetti(true);
    }
  }, [candlesLit, balloonsPop]);

  const candlesLight = (index: number) => {
    if (index === candlesLit) {
      setCandlesLit((prev) => prev + 1);
    }
  };

  const popBalloons = (index: number) => {
    if (index === balloonsPop) {
      setBalloonsPop((prev) => prev + 1);
    }
  };

  const celebrate = () => {
    setCelebrating(true);
    setConfetti(true);
    const interval = setInterval(() => {
      setCandlesLit((prev) => {
        if (prev < totalcandles) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{
      backgroundImage: `url(https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      {!showCard ? (
        <Card className="w-full max-w-md overflow-hidden hover:shadow-2xl border-2 border-black p-4 ">
        <form onSubmit={createCard} className="w-full max-w-md">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name:
            </label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Birthday Date:
            </label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Message:
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button
            type="submit"
            className="bg-orange-950 text-white hover:bg-orange-800 transition-all duration-300 w-full"
          >
            Create Card
          </Button>
        </form>
      </Card>
      ) : (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="mx-auto overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl border-2 border-black">
            <CardHeader className="text-center">
              <CardTitle className="text-4xl font-bold text-black">Happy Birthday!</CardTitle>
              <h1 className="text-2xl text-orange-950 font-bold">{name}</h1>
              <p className="text-lg text-gray-500">{date}</p>
              <CardDescription className="text-2xl font-semibold text-gray-600">{message}</CardDescription>
            
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <div>
                <h3 className="text-lg font-semibold text-black mb-2">Light the candles:</h3>
                <div className="flex justify-center space-x-2">
                  {[...Array(totalcandles)].map((_, index) => (
                    <AnimatePresence key={index}>
                      {(celebrating && index <= candlesLit) || (!celebrating && index < candlesLit) ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ duration: 0.5, delay: celebrating ? index * 0.5 : 0 }}
                        >
                          <FaBirthdayCake
                            className={`w-8 h-8 transition-colors duration-300 ease-in-out cursor-pointer hover:scale-110`}
                            style={{ color: candleColors[index % candleColors.length] }}
                            onClick={() => candlesLight(index)}
                          />
                        </motion.div>
                      ) : (
                        <FaBirthdayCake
                          className={`w-8 h-8 text-gray-300 transition-colors duration-300 ease-in-out cursor-pointer hover:scale-110`}
                          onClick={() => candlesLight(index)}
                        />
                      )}
                    </AnimatePresence>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-black mb-2">Pop the balloons:</h3>
                <div className="flex justify-center space-x-2">
                  {[...Array(totalBalloons)].map((_, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 1 }}
                      animate={{ scale: index < balloonsPop ? 0 : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <GiBalloons
                        className={`w-8 h-8 cursor-pointer hover:scale-110`}
                        style={{ color: index < balloonsPop ? '#D1D5DB' : balloonColors[index % balloonColors.length] }}
                        onClick={() => popBalloons(index)}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button 
                className="bg-orange-950 text-white hover:bg-orange-800 transition-all duration-300"
                onClick={celebrate}
                disabled={celebrating}
              >
                Celebrate! <FaGift className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
          {confetti && (
            <DynamicConfetti
              width={window.innerWidth}
              height={window.innerHeight}
              recycle={false}
              numberOfPieces={1000}
              colors={confettiColors}
            />
          )}
        </motion.div>
      )}
    </div>
  );
};
