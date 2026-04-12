export const getRiskColor = (riskLevel: string) => {
  switch (riskLevel) {
    case "High":
      return "text-red-600 bg-red-50 border-red-200";
    case "Medium":
      return "text-yellow-600 bg-yellow-50 border-yellow-200";
    case "Low":
      return "text-green-600 bg-green-50 border-green-200";
    default:
      return "text-gray-600 bg-gray-50 border-gray-200";
  }
};
