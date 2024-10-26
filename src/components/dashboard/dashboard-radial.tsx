import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react"
import { chartConfig } from "@/config/dashboardChart"

export const description = "A radial chart with stacked sections"

const chartData = [{ month: "january", desktop: 1260, mobile: 570 }]

const chartDataSuccess = [
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
]

const chartConfigSuccess = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig


export function StudentRegGraph() {
  const totalVisitors = chartData[0].desktop + chartData[0].mobile

  return (
    <Card className="flex-1 ">
        <CardHeader>
            <div className="flex flex-col justify-center items-start">
            <p className="text-md">NextUI</p>
            <p className="text-small text-default-500">nextui.org</p>
            </div>
        </CardHeader>
        <Divider/>
        <CardBody className=" flex overflow-hidden">

        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px] "
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="desktop"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-desktop)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="mobile"
              fill="var(--color-mobile)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
            </CardBody>
    </Card>
      
  )
}



export function StudentSuccessGraph() {
  return (
    <Card className="flex-1">
      <CardHeader>
            <div className="flex flex-col justify-center items-start">
            <p className="text-md">NextUI</p>
            <p className="text-small text-default-500">nextui.org</p>
            </div>
        </CardHeader>
        <Divider/>
        <CardBody className="flex justify-center items-center overflow-hidden ">

        <ChartContainer
          config={chartConfigSuccess}
          className="mx-auto aspect-square flex min-h-[250px] "
        >
          <RadialBarChart
            data={chartDataSuccess}
            startAngle={0}
            endAngle={250}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="visitors" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {chartDataSuccess[0].visitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
        </CardBody>
      
    </Card>
  )
}
