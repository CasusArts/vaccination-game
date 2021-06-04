import Vec2 from "./Vec2";
import { Howl, Howler } from 'howler';

export default class Person {
  constructor(x, y, disease, status, distances, diseaseArms, radius) {
    this.center = {
      x: x,
      y: y,
    };
    this.diseaseSpeed = disease;
    this.status = status;   // 1: Healthy; 2: Imune; 3: Sick;
    this.distances = distances;
    this.waypoints = {
      toTopRight: {
        step: 1,
        points: null,
      },
      toBottomRight: {
        step: 1,
        points: null,
      },
      toBottomLeft: {
        step: 1,
        points: null,
      },
      toTopLeft: {
        step: 1,
        points: null,
      },
    };

    this.diseaseArms = diseaseArms;
    this.surroundPeople = null;
    this.radius = radius;
    this.shieldSize = 6;
    this.maxDistanceX = this.distances.x - this.radius - this.shieldSize;
    this.maxDistanceY = this.distances.y - this.radius - this.shieldSize;

    this.colors = {
      healthy:      "#83ebce",
      healthyTransp:"#283841",
      imune:        "#EA9B1C",
      imuneTransp:  "rgba(234, 155, 28, 0.2)",
      sick:         "#e36037",
      sickTransp:   "rgba(225, 87, 64, 0.2)",
      bg:           "#030710",
      diseaseArms:  "#de3533"
    }
  }

  draw(ctx) {
    ctx.lineCap = "round";
    ctx.lineWidth = 2;

    if (this.status === 3) {
      // DiseaseArm Right
      if (this.diseaseArms.right.enabled) {
        if (this.diseaseArms.right.size < this.maxDistanceX) {
          ctx.beginPath();
          ctx.moveTo(
            this.center.x,
            this.center.y
          );
          ctx.lineTo(
            this.center.x + Math.floor(this.diseaseArms.right.size),
            this.center.y
          );
          ctx.strokeStyle = this.colors.diseaseArms;
          ctx.stroke();

          this.diseaseArms.right.size += (this.maxDistanceX / this.diseaseSpeed.right);
        } else {
          ctx.beginPath();
          ctx.moveTo(this.center.x, this.center.y);
          ctx.lineTo(this.center.x + this.diseaseArms.right.size, this.center.y);
          ctx.strokeStyle = this.colors.diseaseArms;
          ctx.stroke();
        }
      }

      // DiseaseArm Left
      if (this.diseaseArms.left.enabled) {
        if (this.diseaseArms.left.size < this.maxDistanceX) {
          ctx.beginPath();
          ctx.moveTo(
            this.center.x,
            this.center.y
          );
          ctx.lineTo(
            this.center.x - Math.floor(this.diseaseArms.left.size),
            this.center.y
          );
          ctx.strokeStyle = this.colors.diseaseArms;
          ctx.stroke();

          this.diseaseArms.left.size += (this.maxDistanceX / this.diseaseSpeed.left);
        } else {
          ctx.beginPath();
          ctx.moveTo(this.center.x, this.center.y);
          ctx.lineTo(this.center.x - this.diseaseArms.left.size, this.center.y);
          ctx.strokeStyle = this.colors.diseaseArms;
          ctx.stroke();
        }
      }

      // DiseaseArm Top
      if (this.diseaseArms.top.enabled) {
        if (this.diseaseArms.top.size < this.maxDistanceY) {
          ctx.beginPath();
          ctx.moveTo(
            this.center.x,
            this.center.y
          );
          ctx.lineTo(
            this.center.x,
            this.center.y - Math.floor(this.diseaseArms.top.size)
          );
          ctx.strokeStyle = this.colors.diseaseArms;
          ctx.stroke();

          this.diseaseArms.top.size += (this.maxDistanceY / this.diseaseSpeed.top);
        } else {
          ctx.beginPath();
          ctx.moveTo(this.center.x, this.center.y);
          ctx.lineTo(this.center.x, this.center.y - this.maxDistanceY);
          ctx.strokeStyle = this.colors.diseaseArms;
          ctx.stroke();
        }
      }

      // DiseaseArm Bottom
      if (this.diseaseArms.bottom.enabled) {
        if (this.diseaseArms.bottom.size < this.maxDistanceY) {
          ctx.beginPath();
          ctx.moveTo(
            this.center.x,
            this.center.y
          );
          ctx.lineTo(
            this.center.x,
            this.center.y + Math.floor(this.diseaseArms.bottom.size)
          );
          ctx.strokeStyle = this.colors.diseaseArms;
          ctx.stroke();

          this.diseaseArms.bottom.size += (this.maxDistanceY / this.diseaseSpeed.bottom);
        } else {
          ctx.beginPath();
          ctx.moveTo(this.center.x, this.center.y);
          ctx.lineTo(this.center.x, this.center.y + this.maxDistanceY);
          ctx.strokeStyle = this.colors.diseaseArms;
          ctx.stroke();
        }
      }

      // DiseaseArm Top-Right
      if (this.diseaseArms.topRight.enabled) {
        if (this.waypoints.toTopRight.step < 99) {
          ctx.beginPath();
          ctx.moveTo(
            this.waypoints.toTopRight.points[0].x,
            this.waypoints.toTopRight.points[0].y
          );
          ctx.lineTo(
            this.waypoints.toTopRight.points[Math.floor(this.waypoints.toTopRight.step)].x,
            this.waypoints.toTopRight.points[Math.floor(this.waypoints.toTopRight.step)].y
          );
          ctx.strokeStyle = this.colors.diseaseArms;
          ctx.stroke();

          this.waypoints.toTopRight.step += this.waypoints.toTopRight.points.length / this.diseaseSpeed.topRight;
        } else {
          ctx.beginPath();
          ctx.moveTo(this.waypoints.toTopRight.points[0].x, this.waypoints.toTopRight.points[0].y);
          ctx.lineTo(this.waypoints.toTopRight.points[99].x, this.waypoints.toTopRight.points[99].y);
          ctx.lineWidth = 2;
          ctx.strokeStyle = this.colors.diseaseArms;
          ctx.stroke();
        }
      }

      // DiseaseArm Bottom-Right
      if (this.diseaseArms.bottomRight.enabled) {
        if (this.waypoints.toBottomRight.step < 99) {
            ctx.beginPath();
            ctx.moveTo(
              this.waypoints.toBottomRight.points[0].x,
              this.waypoints.toBottomRight.points[0].y
            );
            ctx.lineTo(
              this.waypoints.toBottomRight.points[Math.floor(this.waypoints.toBottomRight.step)].x,
              this.waypoints.toBottomRight.points[Math.floor(this.waypoints.toBottomRight.step)].y
            );
            ctx.strokeStyle = this.colors.diseaseArms;
            ctx.stroke();

            this.waypoints.toBottomRight.step += this.waypoints.toBottomRight.points.length / this.diseaseSpeed.bottomRight;
        } else {
          ctx.beginPath();
          ctx.moveTo(this.waypoints.toBottomRight.points[0].x, this.waypoints.toBottomRight.points[0].y);
          ctx.lineTo(this.waypoints.toBottomRight.points[99].x, this.waypoints.toBottomRight.points[99].y);
          ctx.strokeStyle = this.colors.diseaseArms;
          ctx.stroke();
        }
      }

      // DiseaseArm Bottom-Left
      if (this.diseaseArms.bottomLeft.enabled) {
        if (this.waypoints.toBottomLeft.step < 99) {
          ctx.beginPath();
          ctx.moveTo(
            this.waypoints.toBottomLeft.points[0].x,
            this.waypoints.toBottomLeft.points[0].y
          );
          ctx.lineTo(
            this.waypoints.toBottomLeft.points[Math.floor(this.waypoints.toBottomLeft.step)].x,
            this.waypoints.toBottomLeft.points[Math.floor(this.waypoints.toBottomLeft.step)].y
          );
          ctx.strokeStyle = this.colors.diseaseArms;
          ctx.stroke();

          this.waypoints.toBottomLeft.step += this.waypoints.toBottomLeft.points.length / this.diseaseSpeed.bottomLeft;
        } else {
          ctx.beginPath();
          ctx.moveTo(this.waypoints.toBottomLeft.points[0].x, this.waypoints.toBottomLeft.points[0].y);
          ctx.lineTo(this.waypoints.toBottomLeft.points[99].x, this.waypoints.toBottomLeft.points[99].y);
          ctx.strokeStyle = this.colors.diseaseArms;
          ctx.stroke();
        }
      }

      // DiseaseArm Top-Left
      if (this.diseaseArms.topLeft.enabled) {
        if (this.waypoints.toTopLeft.step < 99) {
          ctx.beginPath();
          ctx.moveTo(
            this.waypoints.toTopLeft.points[0].x,
            this.waypoints.toTopLeft.points[0].y
          );
          ctx.lineTo(
            this.waypoints.toTopLeft.points[Math.floor(this.waypoints.toTopLeft.step)].x,
            this.waypoints.toTopLeft.points[Math.floor(this.waypoints.toTopLeft.step)].y
          );
          ctx.lineWidth = 2;
          ctx.strokeStyle = this.colors.diseaseArms;
          ctx.stroke();

          this.waypoints.toTopLeft.step += this.waypoints.toTopLeft.points.length / this.diseaseSpeed.topLeft;
        } else {
          ctx.beginPath();
          ctx.moveTo(this.waypoints.toTopLeft.points[0].x, this.waypoints.toTopLeft.points[0].y);
          ctx.lineTo(this.waypoints.toTopLeft.points[99].x, this.waypoints.toTopLeft.points[99].y);
          ctx.strokeStyle = this.colors.diseaseArms;
          ctx.stroke();
        }
      }
    }

    // Drawing Person
    if (this.status === 1) {
      // Head
      ctx.beginPath();
      ctx.arc(
        this.center.x,
        this.center.y,
        this.radius,
        0,
        Math.PI * 2,
        false
      );
      ctx.lineWidth = 5;
      ctx.strokeStyle = this.colors.healthy;
      ctx.stroke();
      ctx.fillStyle = this.colors.healthyTransp;
      ctx.fill();

      // Left eye
      ctx.beginPath();
      ctx.arc(this.center.x - (this.radius / 3), this.center.y - (this.radius / 4), 2, 0, Math.PI * 2, false);
      ctx.fillStyle = this.colors.healthy;
      ctx.fill();

      // Right eye
      ctx.beginPath();
      ctx.arc(this.center.x + (this.radius / 3), this.center.y - (this.radius / 4), 2, 0, Math.PI * 2, false);
      ctx.fillStyle = this.colors.healthy;
      ctx.fill();

      // Mouth
      ctx.beginPath();
      ctx.moveTo(
        this.center.x - (this.radius / 2.5), // Starting Point
        this.center.y + (this.radius / 3), // Starting Point
      );
      ctx.lineTo(
        this.center.x + (this.radius / 2.5), // Ending Point
        this.center.y + (this.radius / 3), // Ending Point
      );
      ctx.lineWidth = 2;
      ctx.strokeStyle = this.colors.healthy;
      ctx.stroke();
    } else if (this.status === 2) {
      // Head
      ctx.beginPath();
      ctx.arc(
        this.center.x,
        this.center.y,
        this.radius,
        0,
        Math.PI * 2,
        false
      );
      ctx.lineWidth = 5;
      ctx.strokeStyle = this.colors.imune;
      ctx.stroke();
      ctx.fillStyle = this.colors.imune;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(
        this.center.x,
        this.center.y,
        this.radius + 6,
        0,
        Math.PI * 2,
        false
      );
      ctx.fillStyle = this.colors.imuneTransp;
      ctx.fill();

      // Left eye
      ctx.beginPath();
      ctx.arc(this.center.x - (this.radius / 3), this.center.y - (this.radius / 3), 2, 0, Math.PI * 2, false);
      ctx.fillStyle = this.colors.bg;
      ctx.fill();

      // Right eye
      ctx.beginPath();
      ctx.arc(this.center.x + (this.radius / 3), this.center.y - (this.radius / 3), 2, 0, Math.PI * 2, false);
      ctx.fillStyle = this.colors.bg;
      ctx.fill();

      // Mouth
      ctx.beginPath();
      ctx.moveTo(
        this.center.x - (this.radius / 2), // Starting Point
        this.center.y + (this.radius / 5), // Starting Point
      );
      ctx.bezierCurveTo(
        this.center.x - (this.radius / 2.5), // Force Curve Starting Point
        this.center.y + (this.radius / 1.5), // Force Curve Starting Point

        this.center.x + (this.radius / 2.5), // Force Curve Ending Point
        this.center.y + (this.radius / 1.5), // Force Curve Ending Point

        this.center.x + (this.radius / 2), // Ending Point
        this.center.y + (this.radius / 5), // Ending Point
      );
      ctx.lineWidth = 2;
      ctx.strokeStyle = this.colors.bg;
      ctx.stroke();
    } else if (this.status === 3) {
      // Head
      ctx.beginPath();
      ctx.arc(
        this.center.x + (Math.floor(Math.random() * 2) - 0.5),
        this.center.y + (Math.floor(Math.random() * 2) - 0.5),
        this.radius,
        0,
        Math.PI * 2,
        false
      );
      ctx.lineWidth = 5;
      ctx.strokeStyle = this.colors.sick;
      ctx.stroke();
      ctx.fillStyle = this.colors.sick;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(
        this.center.x,
        this.center.y,
        this.radius + 6,
        0,
        Math.PI * 2,
        false
      );
      ctx.fillStyle = this.colors.sickTransp;
      ctx.fill();

      // Left eye
      ctx.beginPath();
      ctx.arc(this.center.x - (this.radius / 3), this.center.y - (this.radius / 3), 2.5, 0, Math.PI * 2, false);
      ctx.fillStyle = this.colors.bg;
      ctx.fill();

      // Right eye
      ctx.beginPath();
      ctx.arc(this.center.x + (this.radius / 3), this.center.y - (this.radius / 3), 2.5, 0, Math.PI * 2, false);
      ctx.fillStyle = this.colors.bg;
      ctx.fill();

      // Mouth
      ctx.beginPath();
      ctx.moveTo(
        this.center.x - (this.radius / 2),  // Starting Point
        this.center.y + (this.radius / 2),  // Starting Point
      );
      ctx.bezierCurveTo(
        this.center.x - (this.radius / 2.5), // Force Curve Starting Point
        this.center.y + (this.radius / 5), // Force Curve Starting Point

        this.center.x + (this.radius / 2.5), // Force Curve Ending Point
        this.center.y + (this.radius / 5), // Force Curve Ending Point

        this.center.x + (this.radius / 2), // Ending Point
        this.center.y + (this.radius / 2), // Ending Point
      );
      ctx.lineWidth = 2;
      ctx.strokeStyle = this.colors.bg;
      ctx.stroke();
    }
  }

  update(ctx) {
    this.draw(ctx);
    return this.status;
  }

  getDistance(x1, y1, x2, y2) {
    const xDist = x2 - x1;
    const yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
  }

  setMounted(surroundPeople) {
    this.surroundPeople = surroundPeople;
  }
}
