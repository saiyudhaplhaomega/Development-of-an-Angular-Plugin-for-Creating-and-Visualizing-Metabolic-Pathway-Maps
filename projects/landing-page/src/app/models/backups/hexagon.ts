import { Component, OnInit, destroyPlatform } from '@angular/core';

import { ClickMode, Engine, HoverMode, MoveDirection, OutMode, OutModes } from 'tsparticles-engine';
import { loadSlim } from 'tsparticles-slim';
import { polygonPathName, loadPolygonPath } from 'tsparticles-path-polygon';

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


  /* or the classic JavaScript object */
  particlesOptions = {
    fpsLimit: 120,
    autoPlay: true,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: ClickMode.push
        },
      },
    },
    stroke: { color: "random", width: 0 },
    particles: {
      color: {
        value: "#FF0000",
      },
      move: {
        direction: MoveDirection.none,
        enable: true,
        outModes: {
          default: OutMode.destroy
        },
        path: {
          clamp: false,
          enable: true,
          delay: {
            value: 0
          },
          generator: "polygonPathGenerator",
          options: {
            sides: 6,
            turnSteps: 30,
            angle: 30
          }
        },
        random: false,
        speed: 3,
        straight: false,
        trail: {
          fill: {
            color: "#000"
          },
          length: 20,
          enable: true
        }
      },
      number: {
        value: 250
      },
      opacity: {
        value: 1
      },
      shape: {
        type: "circle"
      },
      size: {
        value: 1
      }
    },
    background: {
      color: "#000"
    },
    fullScreen: {
      zIndex: -1
    },
    detectRetina: true,
    emitters: {
      direction: MoveDirection.none,
      rate: {
        quantity: 1,
        delay: 0.25
      },
      size: {
        width: 0,
        height: 0
      },
      position: {
        x: 50,
        y: 50
      }
    }
  };

  particlesLoaded(container): void {
    console.log(container);
  }

  async particlesInit(engine): Promise<void> {
    loadPolygonPath(engine);
    await loadSlim(engine);
  }

  constructor() {}

  ngOnInit(): void {}
}
