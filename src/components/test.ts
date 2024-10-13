// Updated CreateSeminar Component
import useGeolocation from "./useGeolocation"; // Import the new hook

const CreateSeminar = () => {
  // ... other states ...
  const { location, error } = useGeolocation();
  const [locationChecks, setLocationChecks] = useState<GeolocationResult[]>([]);

  useEffect(() => {
    if (location && locationChecks.length < 3) {
      setLocationChecks((prev) => [...prev, location]);
    }
  }, [location]);

  const getAverageLocation = () => {
    if (locationChecks.length === 0) return null;
    const sum = locationChecks.reduce(
      (acc, loc) => ({
        latitude: acc.latitude + loc.latitude,
        longitude: acc.longitude + loc.longitude,
        accuracy: acc.accuracy + loc.accuracy,
      }),
      { latitude: 0, longitude: 0, accuracy: 0 }
    );
    return {
      latitude: sum.latitude / locationChecks.length,
      longitude: sum.longitude / locationChecks.length,
      accuracy: sum.accuracy / locationChecks.length,
    };
  };

  const handleCreateSeminar = async (e: FormEvent) => {
    e.preventDefault();
    if (disable) return;

    try {
      setLoading(true);
      const avgLocation = getAverageLocation();
      if (!avgLocation) {
        setLoading(false);
        toast.error("Unable to verify location. Please try again.");
        return;
      }

      const classData = {
        className,
        code,
        latitude: avgLocation.latitude,
        longitude: avgLocation.longitude,
        accuracy: avgLocation.accuracy,
        ipAddTeacher,
      };

      // ... rest of the create seminar logic ...
    } catch (error: any) {
      // ... error handling ...
    }
  };

  // ... rest of the component ...
};

///////////////////join seminar
// Updated JoinSeminar Component
const JoinSeminar = () => {
  // ... other states ...
  const { location, error } = useGeolocation();
  const [locationChecks, setLocationChecks] = useState<GeolocationResult[]>([]);

  useEffect(() => {
    if (location && locationChecks.length < 3) {
      setLocationChecks((prev) => [...prev, location]);
    }
  }, [location]);

  const getAverageLocation = () => {
    // ... same as in CreateSeminar ...
  };

  const JoinSeminar = async (e: FormEvent) => {
    e.preventDefault();
    if (disable) return;

    try {
      setLoading(true);
      const avgLocation = getAverageLocation();
      if (!avgLocation) {
        setLoading(false);
        toast.error("Unable to verify location. Please try again.");
        return;
      }

      const payload = {
        latitude: avgLocation.latitude,
        longitude: avgLocation.longitude,
        accuracy: avgLocation.accuracy,
        code,
        ip,
      };

      // ... rest of the join seminar logic ...
    } catch (error: any) {
      // ... error handling ...
    }
  };

  // ... rest of the component ...
};
