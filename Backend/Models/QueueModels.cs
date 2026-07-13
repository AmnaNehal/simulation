namespace QueueAlgoAPI.Models;

// ==================== M/M/1 Model ====================
public class MM1Model
{
    public class InputParams
    {
        public double MeanInterarrivalTime { get; set; }
        public double MeanServiceTime { get; set; }
    }

    public class Result
    {
        public double Rho { get; set; }
        public double Ls { get; set; }
        public double Ws { get; set; }
        public double Lq { get; set; }
        public double Wq { get; set; }
        public double Idle { get; set; }
        public bool IsStable { get; set; }
        public string? ErrorMessage { get; set; }
    }

    public static Result Calculate(InputParams input)
    {
        var result = new Result();

        if (input.MeanInterarrivalTime <= 0 || input.MeanServiceTime <= 0)
        {
            result.ErrorMessage = "Enter valid positive numbers.";
            result.IsStable = false;
            return result;
        }

        double lambda = 1.0 / input.MeanInterarrivalTime;
        double mu = 1.0 / input.MeanServiceTime;
        double rho = lambda / mu;

        if (rho >= 1)
        {
            result.ErrorMessage = "ρ ≥ 1: System is unstable (overloaded).";
            result.IsStable = false;
            result.Rho = rho;
            return result;
        }

        result.Rho = rho;
        result.Ls = rho / (1 - rho);
        result.Ws = 1 / (mu - lambda);
        result.Lq = (rho * rho) / (1 - rho);
        result.Wq = rho / (mu - lambda);
        result.Idle = 1 - rho;
        result.IsStable = true;

        return result;
    }
}

// ==================== M/M/S Model ====================
public class MMSModel
{
    public class InputParams
    {
        public int NumberOfServers { get; set; }
        public double MeanInterarrivalTime { get; set; }
        public double MeanServiceTime { get; set; }
    }

    public class Result
    {
        public double Rho { get; set; }
        public double P0 { get; set; }
        public double Ls { get; set; }
        public double Ws { get; set; }
        public double Lq { get; set; }
        public double Wq { get; set; }
        public double Idle { get; set; }
        public bool IsStable { get; set; }
        public string? ErrorMessage { get; set; }
    }

    private static double Factorial(int n)
    {
        if (n <= 1) return 1;
        double result = 1;
        for (int i = 2; i <= n; i++)
            result *= i;
        return result;
    }

    public static Result Calculate(InputParams input)
    {
        var result = new Result();

        if (input.MeanInterarrivalTime <= 0 || input.MeanServiceTime <= 0 || input.NumberOfServers <= 0)
        {
            result.ErrorMessage = "Enter valid positive numbers.";
            result.IsStable = false;
            return result;
        }

        double lambda = 1.0 / input.MeanInterarrivalTime;
        double mu = 1.0 / input.MeanServiceTime;
        int S = input.NumberOfServers;
        double rho = lambda / (S * mu);

        if (rho >= 1)
        {
            result.ErrorMessage = "ρ ≥ 1: System unstable.";
            result.IsStable = false;
            result.Rho = rho;
            return result;
        }

        double P0inv = 0;
        for (int k = 0; k < S; k++)
        {
            P0inv += Math.Pow(S * rho, k) / Factorial(k);
        }
        P0inv += Math.Pow(S * rho, S) / (Factorial(S) * (1 - rho));
        double P0 = 1.0 / P0inv;

        double Lq = P0 * (Math.Pow(lambda / mu, S) * rho) / (Factorial(S) * Math.Pow(1 - rho, 2));
        double Wq = Lq / lambda;
        double Ws = Wq + 1.0 / mu;
        double Ls = lambda * Ws;

        result.Rho = rho;
        result.P0 = P0;
        result.Lq = Lq;
        result.Wq = Wq;
        result.Ws = Ws;
        result.Ls = Ls;
        result.Idle = 1 - rho;
        result.IsStable = true;

        return result;
    }
}

// ==================== M/G/1 Model ====================
public class MG1Model
{
    public enum ServiceDistType
    {
        Exponential,
        Poisson
    }

    public class InputParams
    {
        public double MeanInterarrivalTime { get; set; }
        public ServiceDistType ServiceDistribution { get; set; }
        public double MeanServiceTime { get; set; }
        public double VarianceServiceTime { get; set; }
    }

    public class Result
    {
        public double Rho { get; set; }
        public double Ls { get; set; }
        public double Ws { get; set; }
        public double Lq { get; set; }
        public double Wq { get; set; }
        public double Cs2 { get; set; }
        public double Idle { get; set; }
        public bool IsStable { get; set; }
        public string? ErrorMessage { get; set; }
    }

    public static Result Calculate(InputParams input)
    {
        var result = new Result();

        if (input.MeanInterarrivalTime <= 0 || input.MeanServiceTime <= 0)
        {
            result.ErrorMessage = "Enter valid values.";
            result.IsStable = false;
            return result;
        }

        double lambda = 1.0 / input.MeanInterarrivalTime;
        double mu = 1.0 / input.MeanServiceTime;

        double Cs2;
        double sigma2;

        if (input.ServiceDistribution == ServiceDistType.Exponential)
        {
            Cs2 = 1;
            sigma2 = Math.Pow(1.0 / mu, 2);
        }
        else
        {
            double mean = input.MeanServiceTime;
            double variance = mean;
            Cs2 = variance / Math.Pow(1.0 / mu, 2);
            sigma2 = input.VarianceServiceTime;
        }

        double rho = lambda / mu;

        if (rho >= 1)
        {
            result.ErrorMessage = "ρ ≥ 1: System unstable.";
            result.IsStable = false;
            result.Rho = rho;
            return result;
        }

        double Lq = (Math.Pow(lambda, 2) * sigma2 + Math.Pow(rho, 2)) / (2 * (1 - rho));
        double Wq = Lq / lambda;
        double Ws = Wq + 1.0 / mu;
        double Ls = lambda * Ws;

        result.Rho = rho;
        result.Lq = Lq;
        result.Wq = Wq;
        result.Ws = Ws;
        result.Ls = Ls;
        result.Cs2 = Cs2;
        result.Idle = 1 - rho;
        result.IsStable = true;

        return result;
    }
}

// ==================== M/G/S Model ====================
public class MGSModel
{
    public enum ServiceDistType
    {
        Exponential,
        Poisson
    }

    public class InputParams
    {
        public int NumberOfServers { get; set; }
        public double MeanInterarrivalTime { get; set; }
        public ServiceDistType ServiceDistribution { get; set; }
        public double MeanServiceTime { get; set; }
    }

    public class Result
    {
        public double Rho { get; set; }
        public double Ls { get; set; }
        public double Ws { get; set; }
        public double Lq { get; set; }
        public double Wq { get; set; }
        public double Idle { get; set; }
        public bool IsStable { get; set; }
        public string? ErrorMessage { get; set; }
    }

    private static double Factorial(int n)
    {
        if (n <= 1) return 1;
        double result = 1;
        for (int i = 2; i <= n; i++)
            result *= i;
        return result;
    }

    public static Result Calculate(InputParams input)
    {
        var result = new Result();

        if (input.MeanInterarrivalTime <= 0 || input.MeanServiceTime <= 0 || input.NumberOfServers <= 0)
        {
            result.ErrorMessage = "Enter valid values.";
            result.IsStable = false;
            return result;
        }

        double lambda = 1.0 / input.MeanInterarrivalTime;
        double mu = 1.0 / input.MeanServiceTime;
        int S = input.NumberOfServers;
        double rho = lambda / (S * mu);

        if (rho >= 1)
        {
            result.ErrorMessage = "ρ ≥ 1: System unstable.";
            result.IsStable = false;
            result.Rho = rho;
            return result;
        }

        double Cs2 = input.ServiceDistribution == ServiceDistType.Exponential 
            ? 1 
            : mu; // Poisson service: variance = mean, so Cs2 = variance/mean^2 = mean/mean^2 = 1/mean = mu

        double P0inv = 0;
        for (int k = 0; k < S; k++)
        {
            P0inv += Math.Pow(S * rho, k) / Factorial(k);
        }
        P0inv += Math.Pow(S * rho, S) / (Factorial(S) * (1 - rho));
        double P0 = 1.0 / P0inv;

        double Lq_mm = P0 * (Math.Pow(lambda / mu, S) * rho) / (Factorial(S) * Math.Pow(1 - rho, 2));
        double Lq = Lq_mm * (1 + Cs2) / 2;
        double Wq = Lq / lambda;
        double Ws = Wq + 1.0 / mu;
        double Ls = lambda * Ws;

        result.Rho = rho;
        result.Lq = Lq;
        result.Wq = Wq;
        result.Ws = Ws;
        result.Ls = Ls;
        result.Idle = 1 - rho;
        result.IsStable = true;

        return result;
    }
}

// ==================== G/G/1 Model ====================
public class GG1Model
{
    public enum DistributionType
    {
        Exponential,
        Poisson,
        Normal,
        Uniform,
        Gamma
    }

    public class InputParams
    {
        public DistributionType InterarrivalDistribution { get; set; }
        public double MeanInterarrivalTime { get; set; }
        public double VarianceInterarrival { get; set; }
        public DistributionType ServiceDistribution { get; set; }
        public double MeanServiceTime { get; set; }
        public double VarianceService { get; set; }
    }

    public class Result
    {
        public double Rho { get; set; }
        public double Ca2 { get; set; }
        public double Cs2 { get; set; }
        public double Ls { get; set; }
        public double Ws { get; set; }
        public double Lq { get; set; }
        public double Wq { get; set; }
        public double Idle { get; set; }
        public bool IsStable { get; set; }
        public string? ErrorMessage { get; set; }
    }

    private static double CalculateCa2(DistributionType dist, double mean, double variance)
    {
        if (dist == DistributionType.Exponential)
            return 1;
        if (dist == DistributionType.Poisson)
            return mean / Math.Pow(mean, 2);
        return variance / Math.Pow(mean, 2);
    }

    private static double CalculateCs2(DistributionType dist, double mean, double variance)
    {
        if (dist == DistributionType.Exponential)
            return 1;
        if (dist == DistributionType.Poisson)
            return mean / Math.Pow(mean, 2);
        return variance / Math.Pow(mean, 2);
    }

    public static Result Calculate(InputParams input)
    {
        var result = new Result();

        if (input.MeanInterarrivalTime <= 0 || input.MeanServiceTime <= 0)
        {
            result.ErrorMessage = "Enter valid values.";
            result.IsStable = false;
            return result;
        }

        double lambda = 1.0 / input.MeanInterarrivalTime;
        double mu = 1.0 / input.MeanServiceTime;
        double rho = lambda / mu;

        if (rho >= 1)
        {
            result.ErrorMessage = "ρ ≥ 1: System unstable.";
            result.IsStable = false;
            result.Rho = rho;
            return result;
        }

        double Ca2 = CalculateCa2(input.InterarrivalDistribution, input.MeanInterarrivalTime, input.VarianceInterarrival);
        double Cs2 = CalculateCs2(input.ServiceDistribution, input.MeanServiceTime, input.VarianceService);

        double Lq = (Math.Pow(rho, 2) * (1 + Cs2) * (Ca2 + Math.Pow(rho, 2) * Cs2)) / 
                    (2 * (1 - rho) * (1 + Math.Pow(rho, 2) * Cs2));
        double Wq = Lq / lambda;
        double Ws = Wq + 1.0 / mu;
        double Ls = lambda * Ws;

        result.Rho = rho;
        result.Ca2 = Ca2;
        result.Cs2 = Cs2;
        result.Lq = Lq;
        result.Wq = Wq;
        result.Ws = Ws;
        result.Ls = Ls;
        result.Idle = 1 - rho;
        result.IsStable = true;

        return result;
    }
}

// ==================== G/G/S Model ====================
public class GGSModel
{
    public enum DistributionType
    {
        Exponential,
        Poisson,
        Normal,
        Uniform,
        Gamma
    }

    public class InputParams
    {
        public int NumberOfServers { get; set; }
        public DistributionType InterarrivalDistribution { get; set; }
        public double MeanInterarrivalTime { get; set; }
        public double VarianceInterarrival { get; set; }
        public DistributionType ServiceDistribution { get; set; }
        public double MeanServiceTime { get; set; }
        public double VarianceService { get; set; }
    }

    public class Result
    {
        public double Rho { get; set; }
        public double Ca2 { get; set; }
        public double Cs2 { get; set; }
        public double Ls { get; set; }
        public double Ws { get; set; }
        public double Lq { get; set; }
        public double Wq { get; set; }
        public double Idle { get; set; }
        public bool IsStable { get; set; }
        public string? ErrorMessage { get; set; }
    }

    private static double Factorial(int n)
    {
        if (n <= 1) return 1;
        double result = 1;
        for (int i = 2; i <= n; i++)
            result *= i;
        return result;
    }

    private static double CalculateCa2(DistributionType dist, double mean, double variance)
    {
        if (dist == DistributionType.Exponential)
            return 1;
        if (dist == DistributionType.Poisson)
            return mean / Math.Pow(mean, 2);
        return variance / Math.Pow(mean, 2);
    }

    private static double CalculateCs2(DistributionType dist, double mean, double variance)
    {
        if (dist == DistributionType.Exponential)
            return 1;
        if (dist == DistributionType.Poisson)
            return mean / Math.Pow(mean, 2);
        return variance / Math.Pow(mean, 2);
    }

    public static Result Calculate(InputParams input)
    {
        var result = new Result();

        if (input.MeanInterarrivalTime <= 0 || input.MeanServiceTime <= 0 || input.NumberOfServers <= 0)
        {
            result.ErrorMessage = "Enter valid values.";
            result.IsStable = false;
            return result;
        }

        double lambda = 1.0 / input.MeanInterarrivalTime;
        double mu = 1.0 / input.MeanServiceTime;
        int S = input.NumberOfServers;
        double rho = lambda / (S * mu);

        if (rho >= 1)
        {
            result.ErrorMessage = "ρ ≥ 1: System unstable.";
            result.IsStable = false;
            result.Rho = rho;
            return result;
        }

        double Ca2 = CalculateCa2(input.InterarrivalDistribution, input.MeanInterarrivalTime, input.VarianceInterarrival);
        double Cs2 = CalculateCs2(input.ServiceDistribution, input.MeanServiceTime, input.VarianceService);

        double P0inv = 0;
        for (int k = 0; k < S; k++)
        {
            P0inv += Math.Pow(S * rho, k) / Factorial(k);
        }
        P0inv += Math.Pow(S * rho, S) / (Factorial(S) * (1 - rho));
        double P0 = 1.0 / P0inv;

        double Lq_mm = P0 * (Math.Pow(lambda / mu, S) * rho) / (Factorial(S) * Math.Pow(1 - rho, 2));
        double Lq = Lq_mm * (Ca2 + Cs2) / 2;
        double Wq = Lq / lambda;
        double Ws = Wq + 1.0 / mu;
        double Ls = lambda * Ws;

        result.Rho = rho;
        result.Ca2 = Ca2;
        result.Cs2 = Cs2;
        result.Lq = Lq;
        result.Wq = Wq;
        result.Ws = Ws;
        result.Ls = Ls;
        result.Idle = 1 - rho;
        result.IsStable = true;

        return result;
    }
}

// ==================== Simulation Engine ====================
public class SimEngine
{
    public enum ServiceDistribution
    {
        Exponential,
        Poisson
    }

    public class SimParams
    {
        public int Servers { get; set; }
        public double ArrivalRate { get; set; }
        public double ServiceRate { get; set; }
        public int NumCustomers { get; set; }
        public ServiceDistribution ServiceDist { get; set; }
    }

    public class SimResult
    {
        public double AvgWaitTime { get; set; }
        public double AvgSystemTime { get; set; }
        public double AvgQueueLength { get; set; }
        public double AvgSystemLength { get; set; }
        public double ServerUtilization { get; set; }
        public double Throughput { get; set; }
        public int TotalServed { get; set; }
        public List<TableRow> Table { get; set; } = new();
    }

    public class TableRow
    {
        public int Customer { get; set; }
        public int Server { get; set; }
        public double ArrivalTime { get; set; }
        public double ServiceStartTime { get; set; }
        public double ServiceTime { get; set; }
        public double DepartureTime { get; set; }
        public double WaitTime { get; set; }
        public double SystemTime { get; set; }
    }

    private static readonly Random _random = new Random();

    private static double ExpRandom(double rate)
    {
        return -Math.Log(1 - _random.NextDouble()) / rate;
    }

    private static double PoissonRandom(double lambda)
    {
        double L = Math.Exp(-lambda);
        int k = 0;
        double p = 1;
        do
        {
            k++;
            p *= _random.NextDouble();
        } while (p > L);
        return k - 1;
    }

    private static double GenerateServiceTime(ServiceDistribution dist, double mu)
    {
        if (dist == ServiceDistribution.Exponential)
            return ExpRandom(mu);

        double mean = 1.0 / mu;
        double val = PoissonRandom(mean);
        return val <= 0 ? mean : val;
    }

    public static SimResult RunSimulation(SimParams parameters)
    {
        var table = new List<TableRow>();
        var serverFreeAt = new double[parameters.Servers];
        double time = 0;

        for (int i = 1; i <= parameters.NumCustomers; i++)
        {
            time += ExpRandom(parameters.ArrivalRate);
            double arrivalTime = time;

            double minFree = serverFreeAt.Min();
            int serverIdx = Array.IndexOf(serverFreeAt, minFree);
            double serviceStart = Math.Max(arrivalTime, minFree);
            double serviceTime = GenerateServiceTime(parameters.ServiceDist, parameters.ServiceRate);
            double departure = serviceStart + serviceTime;
            serverFreeAt[serverIdx] = departure;

            double waitTime = serviceStart - arrivalTime;
            double systemTime = departure - arrivalTime;

            table.Add(new TableRow
            {
                Customer = i,
                Server = serverIdx + 1,
                ArrivalTime = arrivalTime,
                ServiceStartTime = serviceStart,
                ServiceTime = serviceTime,
                DepartureTime = departure,
                WaitTime = waitTime,
                SystemTime = systemTime
            });
        }

        double totalWait = table.Sum(r => r.WaitTime);
        double totalSystem = table.Sum(r => r.SystemTime);
        double totalService = table.Sum(r => r.ServiceTime);
        double simDuration = table[table.Count - 1].DepartureTime;

        double avgWaitTime = totalWait / parameters.NumCustomers;
        double avgSystemTime = totalSystem / parameters.NumCustomers;
        double throughput = parameters.NumCustomers / simDuration;
        double serverUtilization = totalService / (simDuration * parameters.Servers);
        double avgSystemLength = throughput * avgSystemTime;
        double avgQueueLength = throughput * avgWaitTime;

        return new SimResult
        {
            AvgWaitTime = avgWaitTime,
            AvgSystemTime = avgSystemTime,
            AvgQueueLength = avgQueueLength,
            AvgSystemLength = avgSystemLength,
            ServerUtilization = serverUtilization,
            Throughput = throughput,
            TotalServed = parameters.NumCustomers,
            Table = table
        };
    }
}
