import {Card, CardHeader, CardBody, } from "@nextui-org/react";
import { BiFemaleSign, BiMaleSign, BiStar } from "react-icons/bi";

export function MaleStudents() {
  return (
    <Card className="py-4 w-full md:w-1/3" dir="rtl">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">عدد الطلاب الذكور</h4>
        <BiMaleSign/>
        <small className="text-default-500">130 طالب</small>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
    
      </CardBody>
    </Card>
  );
}

export function FemaleStudents() {
    return (
      <Card className="py-4 w-full md:w-1/3" dir="rtl">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <h4 className="font-bold text-large">عدد الطلاب الاناث</h4>
          <BiFemaleSign/>
          <small className="text-default-500">130 طالبة</small>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
      
        </CardBody>
      </Card>
    );
  }

  export function SuccessfulStudents() {
    return (
      <Card className="py-4 w-full md:w-1/3" dir="rtl">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <h4 className="font-bold text-large">عدد الطلاب الناجحين</h4>
          <BiStar/>
          <small className="text-default-500">100 طالب و طالبة</small>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
      
        </CardBody>
      </Card>
    );
  }