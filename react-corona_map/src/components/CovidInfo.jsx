export const CovidInfo = () => {
  return (
    <>
      <div className="absolute top-5 right-5 bg-white p-6 rounded-lg shadow-lg sm:w-72 max-lg:hidden">
        <h2 className="text-gray-800 text-lg font-semibold mb-2">
          Stay Safe, Stay Healthy
        </h2>
        <div className="text-gray-600">
          <p>
            <strong>Prevent COVID-19:</strong>
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="sm:max-w-sm">
              Wash your hands frequently with soap and water.
            </li>
            <li className="sm:max-w-sm">
              Avoid close contact with sick individuals.
            </li>
            <li className="sm:max-w-sm">
              Wear a mask in crowded or enclosed spaces.
            </li>
            <li className="sm:max-w-sm">Maintain social distancing.</li>
            <li className="sm:max-w-sm">
              Clean and disinfect frequently touched objects and surfaces.
            </li>
          </ul>
          <p>
            <strong>Stay Healthy:</strong>
          </p>
          <ul className="list-disc pl-6 mb-0">
            <li className="sm:max-w-sm">
              Eat a balanced diet rich in fruits, vegetables, and whole grains.
            </li>
            <li className="sm:max-w-sm">
              Exercise regularly to boost immunity and reduce stress.
            </li>
            <li className="sm:max-w-sm">
              Get enough sleep each night to support overall health.
            </li>
            <li className="sm:max-w-sm">
              Avoid smoking and excessive alcohol consumption.
            </li>
            <li className="sm:max-w-sm">
              Stay hydrated by drinking plenty of water.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
