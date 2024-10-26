import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "../ui/chart"
import { chartConfig } from "@/config/dashboardChart"
import { chartData } from "@/constants/dashboard"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

export const StudentBarGraph = ()=>{
    return(
        <Card className=" md:min-h-4/5 h-[500px] md:w-1/2 w-full">
      <CardHeader >
      <div className="flex flex-col justify-center items-start">
          <p className="text-md">NextUI</p>
          <p className="text-small text-default-500">nextui.org</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody className="h-full w-full flex justify-center items-center">

    <ChartContainer config={chartConfig} className="w-4/5 h-full">
      <BarChart accessibilityLayer data={chartData} className="w-full" >
      <CartesianGrid vertical={false} />
        <XAxis
        dataKey="month"
        tickLine={false}
        tickMargin={10}
        axisLine={false}
        tickFormatter={(value) => value.slice(0, 3)}
    />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
      </CardBody>
    </Card>

    )
}