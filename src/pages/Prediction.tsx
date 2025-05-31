
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Cloud, ArrowLeft, BarChart3, MapPin, Calendar } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Prediction = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    location: "",
    pm25: "",
    pm10: "",
    no2: "",
    so2: "",
    co: "",
    o3: "",
    temperature: "",
    humidity: "",
    windSpeed: "",
    pressure: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate prediction processing
    toast({
      title: "Prediction Processing",
      description: "Analyzing environmental data...",
    });

    setTimeout(() => {
      toast({
        title: "Prediction Complete",
        description: "Redirecting to results dashboard...",
      });
      
      // Redirect to dashboard with results
      navigate("/dashboard", { state: { predictionData: formData } });
    }, 2000);
  };

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
            <Link to="/">
              <Button variant="outline" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Air Quality Prediction
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Input environmental and meteorological data to receive accurate AQI predictions
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Location Information */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                <span>Location Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="Enter city or coordinates"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="date">Prediction Date</Label>
                  <Input
                    id="date"
                    type="date"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pollutant Concentrations */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-green-600" />
                <span>Pollutant Concentrations (μg/m³)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="pm25">PM2.5</Label>
                  <Input
                    id="pm25"
                    type="number"
                    placeholder="0.0"
                    value={formData.pm25}
                    onChange={(e) => handleInputChange("pm25", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="pm10">PM10</Label>
                  <Input
                    id="pm10"
                    type="number"
                    placeholder="0.0"
                    value={formData.pm10}
                    onChange={(e) => handleInputChange("pm10", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="no2">NO₂</Label>
                  <Input
                    id="no2"
                    type="number"
                    placeholder="0.0"
                    value={formData.no2}
                    onChange={(e) => handleInputChange("no2", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="so2">SO₂</Label>
                  <Input
                    id="so2"
                    type="number"
                    placeholder="0.0"
                    value={formData.so2}
                    onChange={(e) => handleInputChange("so2", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="co">CO</Label>
                  <Input
                    id="co"
                    type="number"
                    placeholder="0.0"
                    value={formData.co}
                    onChange={(e) => handleInputChange("co", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="o3">O₃</Label>
                  <Input
                    id="o3"
                    type="number"
                    placeholder="0.0"
                    value={formData.o3}
                    onChange={(e) => handleInputChange("o3", e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Meteorological Data */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Cloud className="h-5 w-5 text-blue-600" />
                <span>Meteorological Data</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="temperature">Temperature (°C)</Label>
                  <Input
                    id="temperature"
                    type="number"
                    placeholder="25.0"
                    value={formData.temperature}
                    onChange={(e) => handleInputChange("temperature", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="humidity">Humidity (%)</Label>
                  <Input
                    id="humidity"
                    type="number"
                    placeholder="60.0"
                    value={formData.humidity}
                    onChange={(e) => handleInputChange("humidity", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="windSpeed">Wind Speed (m/s)</Label>
                  <Input
                    id="windSpeed"
                    type="number"
                    placeholder="5.0"
                    value={formData.windSpeed}
                    onChange={(e) => handleInputChange("windSpeed", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="pressure">Pressure (hPa)</Label>
                  <Input
                    id="pressure"
                    type="number"
                    placeholder="1013.25"
                    value={formData.pressure}
                    onChange={(e) => handleInputChange("pressure", e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="text-center">
            <Button 
              type="submit" 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 px-12 py-4 text-lg"
            >
              Generate Prediction
              <BarChart3 className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Prediction;
