#define PI 3.1415926538

uniform float time;
uniform sampler2D normalSampler;
uniform vec3 sunDirection;
uniform vec3 sunColor;
uniform vec3 eye;

varying vec3 worldPosition;
varying vec4 projectedPosition;



// waves (change function)
vec4 getNoise(vec2 uv){
    vec2 uv0 = (uv/103.0)+vec2(time/17.0, time/29.0);
    vec2 uv1 = uv/107.0-vec2(time/-19.0, time/31.0);
    vec2 uv2 = uv/vec2(897.0, 983.0)+vec2(time/101.0, time/97.0);
    vec2 uv3 = uv/vec2(991.0, 877.0)-vec2(time/109.0, time/-113.0);
    vec4 noise = (texture2D(normalSampler, uv0*2.0)) +
                 (texture2D(normalSampler, uv1*2.0)) +
                 (texture2D(normalSampler, uv2*2.0)) +
                 (texture2D(normalSampler, uv3*2.0));
    return noise*0.2-1.0;
}

void sunLight(const vec3 surfaceNormal, const vec3 eyeDirection, float shiny, float spec, float diffuse,
              inout vec3 diffuseColor, inout vec3 specularColor){
    vec3 reflection = normalize(reflect(-normalize(sunDirection), surfaceNormal));
    float direction = max(0.0, dot(eyeDirection, reflection));
    specularColor += pow(direction, shiny)*sunColor*spec;
    diffuseColor += max(dot(normalize(sunDirection), surfaceNormal),0.0)*sunColor*diffuse;
}

void main() 
{
    vec4 noise = getNoise(worldPosition.xz);
    vec3 surfaceNormal = normalize(noise.xyz*vec3(2.0,1.0,2.0));

    vec3 diffuse = vec3(0.0);
    vec3 specular = vec3(0.0);

    vec3 worldToEye = eye-worldPosition;
    vec3 eyeDirection = normalize(worldToEye);
    sunLight(surfaceNormal, eyeDirection, 100.0, 2.0, 0.5, diffuse, specular);

    gl_FragColor = vec4((diffuse+specular+vec3(0.1))*vec3(0.3, 0.5, 0.9), 0.8);
}