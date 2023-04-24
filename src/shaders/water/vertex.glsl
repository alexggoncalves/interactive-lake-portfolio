#define PI 3.1415926538

uniform float time;
uniform vec2 waveFrequency;
uniform float waveSpeed;
uniform float waveElevation;

varying vec3 worldPosition;
varying vec4 projectedPosition;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position,1.0);
    worldPosition = vec3(modelPosition);
    projectedPosition = gl_Position = projectionMatrix * viewMatrix * modelPosition;

}