import React from "react";
import ResultCard from "../components/cards/ResultCard";

const WidgetComponents = {
  'all': <ResultCard />
}

export default function componentSelector(type: string){
  return WidgetComponents[type as keyof typeof WidgetComponents];
}
