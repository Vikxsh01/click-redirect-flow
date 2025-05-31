
import { useLocation, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Cloud, ArrowLeft, AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react";

const Dashboard = () => {
  const location = useLocation();
  const predictionData = location.state?.predictionData;

  // Simulate AQI calculation and results
  const aqiValue = Math.floor(Math.random() * 200) + 50; // Random AQI between 50-250
  const getAQIStatus = (aqi: number) => {
    if (aqi <= 50) return { status: "Good", color: "text-green-600", bgColor: "bg-green-100", icon: CheckCircle };
    if (aqi <= 100) return { status: "Moderate", color: "text-yellow-600", bgColor: "bg-yellow-100", icon: Info };
    if (aqi <= 150) return { status: "Unhealthy for Sensitive Groups", color: "text-orange-600", bgColor: "bg-orange-100", icon: AlertTriangle };
    if (aqi <= 200) return { status: "Unhealthy", color: "text-red-600", bgColor: "bg-red-100", icon: XCircle };
    return { status: "Very Unhealthy", color: "text-purple-600", bgColor: "bg-purple-100", icon: XCircle };
  };

  const aqiStatus = getAQIStatus(aqiValue);
  const StatusIcon = aqiStatus.icon;

  const recommendations = [
    "Consider wearing a mask when outdoors",
    "Limit outdoor activities during peak hours",
    "Keep windows closed and use air purifiers",
    "Monitor air quality regularly"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Cloud className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">AirPredict</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/prediction">
                <Button variant="outline">New Prediction</Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="flex items-center space-x-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Home</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Air Quality Prediction Results
          </h1>
          <p className="text-xl text-gray-600">
            Based on the environmental data you provided
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main AQI Result */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-center">Air Quality Index (AQI)</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="relative">
                  <div className="text-6xl font-bold text-gray-900">{aqiValue}</div>
                  <div className={`inline-flex items-center space-x-2 mt-2 px-4 py-2 rounded-full ${aqiStatus.bgColor}`}>
                    <StatusIcon className={`h-5 w-5 ${aqiStatus.color}`} />
                    <span className={`font-semibold ${aqiStatus.color}`}>{aqiStatus.status}</span>
                  </div>
                </div>
                <Progress value={(aqiValue / 300) * 100} className="h-4" />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>0 - Good</span>
                  <span>50 - Moderate</span>
                  <span>100 - Unhealthy</span>
                  <span>150+ - Hazardous</span>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Pollutant Breakdown */}
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle>Pollutant Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {predictionData && Object.entries(predictionData).slice(1, 7).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium capitalize">{key}</span>
                      <span className="text-gray-600">{value} μg/m³</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weather Conditions */}
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle>Weather Conditions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {predictionData && Object.entries(predictionData).slice(7).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium capitalize">{key}</span>
                      <span className="text-gray-600">
                        {value} {key === 'temperature' ? '°C' : key === 'humidity' ? '%' : key === 'windSpeed' ? 'm/s' : 'hPa'}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Recommendations */}
          <div className="space-y-6">
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  <span>Health Recommendations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600">{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle>Prediction Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">{predictionData?.location || "Not specified"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Prediction Time:</span>
                  <span className="font-medium">{new Date().toLocaleTimeString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Model Confidence:</span>
                  <span className="font-medium text-green-600">87%</span>
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Link to="/prediction">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                  Make New Prediction
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
