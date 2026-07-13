using Microsoft.AspNetCore.Mvc;
using QueueAlgoAPI.Models;

namespace QueueAlgoAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class QueueController : ControllerBase
{
    [HttpPost("mm1")]
    public IActionResult CalculateMM1([FromBody] MM1Model.InputParams input)
    {
        var result = MM1Model.Calculate(input);
        return Ok(result);
    }

    [HttpPost("mms")]
    public IActionResult CalculateMMS([FromBody] MMSModel.InputParams input)
    {
        var result = MMSModel.Calculate(input);
        return Ok(result);
    }

    [HttpPost("mg1")]
    public IActionResult CalculateMG1([FromBody] MG1Model.InputParams input)
    {
        var result = MG1Model.Calculate(input);
        return Ok(result);
    }

    [HttpPost("mgs")]
    public IActionResult CalculateMGS([FromBody] MGSModel.InputParams input)
    {
        var result = MGSModel.Calculate(input);
        return Ok(result);
    }

    [HttpPost("gg1")]
    public IActionResult CalculateGG1([FromBody] GG1Model.InputParams input)
    {
        var result = GG1Model.Calculate(input);
        return Ok(result);
    }

    [HttpPost("ggs")]
    public IActionResult CalculateGGS([FromBody] GGSModel.InputParams input)
    {
        var result = GGSModel.Calculate(input);
        return Ok(result);
    }

    [HttpPost("simulate")]
    public IActionResult RunSimulation([FromBody] SimEngine.SimParams simParams)
    {
        var result = SimEngine.RunSimulation(simParams);
        return Ok(result);
    }
}
