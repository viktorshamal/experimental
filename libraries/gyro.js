// MOJA2023 ----------------------------------

var sensor = {
  x: 0,
  y: 0,
  z: 0,
  threshold: 0,
  hasNewValue: false
};
  
var alpa=0;
var beta=0;
var gamma=0;
var alpaOld=0;
var betaOld=0;
var gammaOld=0;
  

function doSensor(e)
  {
     alpa = Math.round(e.alpha);
     beta = Math.round(e.beta); 
     gamma = Math.round(e.gamma);
    
    let difference = distance3D(alpa,beta,gamma, alpaOld,betaOld,gammaOld);
    
    if (difference > sensor.threshold)
    {
       // console.log("difference: ", difference);
        sensor.x = alpa;
        sensor.y = beta;
        sensor.z =gamma;
        sensor.hasNewValue = true;
    
        alpaOld=alpa;
        betaOld=beta;
        gammaOld=gamma;
    }
  else
    {
        sensor.hasNewValue = false;
    }
    
}

 
//-----------3D distance used to calculate difference between new and old values --------- 
 function distance3D(xNew,yNew,zNew,xOld,yOld,zOld)
{
    let a = xNew - xOld;
    let b = yNew - yOld;
    let c = zNew - zOld;
    
    let afstand = Math.round(Math.sqrt(a * a + b*b + c*c));
    return afstand;
}
 

//----------------------------REQUEST PERMISSION ON IOS DEVICeS --------------------------
function touchStarted()
{
  document.getElementById("showdata").innerHTML="clicked";

  if (typeof DeviceOrientationEvent.requestPermission === 'function') 
  {
      DeviceOrientationEvent.requestPermission()
            .then(permissionState => {
      if (permissionState === 'granted') 
        {
                    window.addEventListener("deviceorientation", doSensor, false);
                }
              })
            .catch(alert);
     } 
     
     else 
  { 
    window.addEventListener("deviceorientation", doSensor, false); 
  }
}
