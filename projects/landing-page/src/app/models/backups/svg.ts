import { Component, HostListener, OnInit, destroyPlatform } from '@angular/core';

import { AnimationMode, ClickMode, CollisionMode, DestroyType, DivType, Engine, HoverMode, InteractivityDetect, MoveDirection, OutMode, OutModes, PixelMode, StartValueType } from 'tsparticles-engine';
import { loadSlim } from 'tsparticles-slim';
import { polygonPathName, loadPolygonPath } from 'tsparticles-path-polygon';
import { loadPolygonMaskPlugin } from 'tsparticles-plugin-polygon-mask';

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  goToLink(url: string): void {
    window.open(url, "_blank");
  }

  id = "tsparticles";

  /* Starting from 1.19.0 you can use a remote url (AJAX request) to a JSON with the configuration */
  particlesUrl = "http://foo.bar/particles.json";

  /* or the classic JavaScript object */
  particlesOptions = {
    autoPlay: true,
    background: {
      color: {
        value: "#fff"
      },
    },
    backgroundMask: {
      globalCompositeOperation: "destination-out",
      cover: {
        color: {
          value: "#fff"
        },
        opacity: 1
      },
      enable: false
    },
    defaultThemes: {},
    delay: 0,
    fullScreen: {
      enable: true,
      zIndex: -1
    },
    detectRetina: false,
    duration: 0,
    fpsLimit: 60,
    interactivity: {
      detectsOn: InteractivityDetect.window,
      events: {
        onClick: {
          enable: true,
          mode: "repulse"
        },
        onDiv: {
          selectors: "repulse-div",
          enable: false,
          mode: "repulse",
          type: DivType.circle
        },
        onHover: {
          enable: true,
          mode: "connect",
          parallax: {
            enable: false,
            force: 30,
            smooth: 10
          }
        },
        resize: {
          delay: 0.5,
          enable: true
        }
      },
      modes: {
        trail: {
          delay: 1,
          pauseOnStop: false,
          quantity: 1
        },
        attract: {
          distance: 200,
          duration: 0.4,
          easing: "ease-out-quad",
          factor: 1,
          maxSpeed: 10,
          speed: 1
        },
        bounce: {
          distance: 200
        },
        bubble: {
          distance: 40,
          duration: 2,
          mix: false,
          opacity: 8,
          size: 6,
          divs: {
            distance: 200,
            duration: 0.4,
            mix: false,
            selectors: []
          }
        },
        connect: {
          distance: 60,
          links: {
            opacity: 0.1
          },
          radius: 60
        },
        grab: {
          distance: 400,
          links: {
            blink: false,
            consent: false,
            opacity: 1
          }
        },
        push: {
          default: true,
          groups: [],
          quantity: 4
        },
        remove: {
          quantity: 2
        },
        repulse: {
          distance: 50,
          duration: 0.4,
          factor: 20,
          speed: 1,
          maxSpeed: 50,
          easing: "ease-out-quad",
          divs: {
            distance: 200,
            duration: 0.4,
            factor: 100,
            speed: 1,
            maxSpeed: 50,
            easing: "ease-out-quad",
            selectors: []
          }
        },
        slow: {
          factor: 1,
          radius: 0
        },
        light: {
          area: {
            gradient: {
              start: {
                value: "#ffffff"
              },
              stop: {
                value: "#000000"
              }
            },
            radius: 1000
          },
          shadow: {
            color: {
              value: "#000000"
            },
            length: 2000
          }
        }
      }
    },
    manualParticles: [],
    particles: {
      bounce: {
        horizontal: {
          random: {
            enable: false,
            minimumValue: 0.1
          },
          value: 1
        },
        vertical: {
          random: {
            enable: false,
            minimumValue: 0.1
          },
          value: 1
        }
      },
      collisions: {
        absorb: {
          speed: 2
        },
        bounce: {
          horizontal: {
            random: {
              enable: false,
              minimumValue: 0.1
            },
            value: 1
          },
          vertical: {
            random: {
              enable: false,
              minimumValue: 0.1
            },
            value: 1
          }
        },
        enable: true,
        maxSpeed: 1,
        mode: CollisionMode.bounce,
        overlap: {
          enable: true,
          retries: 0
        }
      },
      color: {
        value: "#000",
        animation: {
          h: {
            count: 0,
            enable: false,
            offset: 0,
            speed: 1,
            delay: 0,
            decay: 0,
            sync: true
          },
          s: {
            count: 0,
            enable: false,
            offset: 0,
            speed: 1,
            delay: 0,
            decay: 0,
            sync: true
          },
          l: {
            count: 0,
            enable: false,
            offset: 0,
            speed: 1,
            delay: 0,
            decay: 0,
            sync: true
          }
        }
      },
      groups: {},
      move: {
        angle: {
          offset: 0,
          value: 90
        },
        attract: {
          distance: 200,
          enable: false,
          rotate: {
            x: 600,
            y: 1200
          }
        },
        center: {
          x: 50,
          y: 50,
          mode: PixelMode.percent,
          radius: 0
        },
        decay: 0,
        distance: {},
        direction: MoveDirection.none,
        drift: 0,
        // Move
        enable: true,
        gravity: {
          acceleration: 9.81,
          enable: false,
          inverse: false,
          maxSpeed: 50
        },
        path: {
          clamp: true,
          delay: {
            random: {
              enable: false,
              minimumValue: 0
            },
            value: 0
          },
          enable: false,
          options: {}
        },
        outModes: {
          default: OutMode.bounce,
          bottom: OutMode.bounce,
          left: OutMode.bounce,
          right: OutMode.bounce,
          top: OutMode.bounce,
        },
        random: false,
        size: false,
        speed: 0.2,
        spin: {
          acceleration: 0,
          enable: false
        },
        straight: false,
        trail: {
          enable: false,
          length: 10,
          fill: {}
        },
        vibrate: false,
        warp: false
      },
      number: {
        density: {
          enable: true
        },
        limit: 0,
        value: 400
      },
      opacity: {
        random: {
          enable: false,
          minimumValue: 0.1
        },
        value: {
          min: 0.3,
          max: 0.8
        },
        animation: {
          count: 0,
          enable: false,
          speed: 2,
          decay: 0,
          delay: 0,
          sync: false,
          mode: AnimationMode.auto,
          startValue: StartValueType.random,
          destroy: DestroyType.none,
          minimumValue: 0.05
        }
      },
      reduceDuplicates: false,
      shadow: {
        blur: 0,
        color: {
          value: "#000"
        },
        enable: false,
        offset: {
          x: 0,
          y: 0
        }
      },
      shape: {
        close: true,
        fill: true,
        options: {},
        type: "circle"
      },
      size: {
        random: {
          enable: false,
          minimumValue: 1
        },
        value: 3,
        animation: {
          count: 0,
          enable: false,
          speed: 40,
          decay: 0,
          delay: 0,
          sync: false,
          mode: AnimationMode.auto,
          startValue: StartValueType.random,
          destroy: DestroyType.none,
          minimumValue: 0.1
        }
      },
      stroke: {
        width: 0
      },
      zIndex: {
        random: {
          enable: false,
          minimumValue: 0
        },
        value: 0,
        opacityRate: 1,
        sizeRate: 1,
        velocityRate: 1
      },
      destroy: {
        bounds: {},
        mode: DestroyType.none,
        split: {
          count: 1,
          factor: {
            random: {
              enable: false,
              minimumValue: 0
            },
            value: 3
          },
          rate: {
            random: {
              enable: false,
              minimumValue: 0
            },
            value: {
              min: 4,
              max: 9
            }
          },
          sizeOffset: true,
          particles: {}
        }
      },
      roll: {
        darken: {
          enable: false,
          value: 0
        },
        enable: false,
        enlighten: {
          enable: false,
          value: 0
        },
        mode: "vertical",
        speed: 25
      },
      tilt: {
        random: {
          enable: false,
          minimumValue: 0
        },
        value: 0,
        animation: {
          enable: false,
          speed: 0,
          decay: 0,
          sync: false
        },
        direction: "clockwise",
        enable: false
      },
      twinkle: {
        lines: {
          enable: false,
          frequency: 0.05,
          opacity: 1
        },
        particles: {
          enable: false,
          frequency: 0.05,
          opacity: 1
        }
      },
      wobble: {
        distance: 5,
        enable: false,
        speed: {
          angle: 50,
          move: 10
        }
      },
      life: {
        count: 0,
        delay: {
          random: {
            enable: false,
            minimumValue: 0
          },
          value: 0,
          sync: false
        },
        duration: {
          random: {
            enable: false,
            minimumValue: 0.0001
          },
          value: 0,
          sync: false
        }
      },
      rotate: {
        random: {
          enable: false,
          minimumValue: 0
        },
        value: 0,
        animation: {
          enable: false,
          speed: 0,
          decay: 0,
          sync: false
        },
        direction: "clockwise",
        path: false
      },
      orbit: {
        animation: {
          count: 0,
          enable: false,
          speed: 1,
          decay: 0,
          delay: 0,
          sync: false
        },
        enable: false,
        opacity: 1,
        rotation: {
          random: {
            enable: false,
            minimumValue: 0
          },
          value: 45
        },
        width: 1
      },
      links: {
        blink: false,
        color: {
          value: "random"
        },
        consent: false,
        distance: 30,
        enable: true,
        frequency: 1,
        opacity: 1,
        shadow: {
          blur: 5,
          color: {
            value: "#000"
          },
          enable: false
        },
        triangles: {
          enable: false,
          frequency: 1
        },
        width: 1,
        warp: false
      },
      repulse: {
        random: {
          enable: false,
          minimumValue: 0
        },
        value: 10,
        enabled: false,
        distance: 100,
        duration: 10,
        factor: 10,
        speed: 1
      }
    },
    pauseOnBlur: true,
    pauseOnOutsideViewport: true,
    responsive: [],
    smooth: false,
    style: {},
    themes: [],
    zLayers: 100,
    motion: {
      disable: false,
      reduce: {
        factor: 4,
        value: true
      }
    },
    polygon: {
      draw: {
        enable: true,
        stroke: {
          color: {
            value: "rgba(255,255,255,0.2)"
          },
          width: 0.5,
          opacity: 1
        }
      },
      enable: true,
      inline: {
        arrangement: "equidistant"
      },
      move: {
        radius: 10,
        type: "path"
      },
      scale: 2,
      type: "inline",
      url: "assets/ECCOLORENZO.svg",
      position: {
        x: 10,
        y: 10
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // Update particles configuration on window resize
    this.updateParticlesConfig();
  }

  private updateParticlesConfig() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
  
    // Update particle size
    this.particlesOptions.particles.size.value = Math.min(windowWidth, windowHeight);

  }

  particlesLoaded(container): void {
    console.log(container);
    // Update particles configuration after they are loaded
    this.updateParticlesConfig();
  }

  async particlesInit(engine): Promise<void> {
    console.log('Initializing particles...');
    try {
      await loadPolygonMaskPlugin(engine);
      await loadSlim(engine);
      console.log('Initialization successful!');
    } catch (error) {
      console.error('Error during initialization:', error);
    }
  }

  constructor() {}

  ngOnInit(): void {}
}
