/* 
    시계는 어떻게 만들어야 하는가...
    시계는 각각 시침, 분침, 초침이 있고
    현재 시간이 계속해서 업데이트 되면 시침, 분침, 초침은 해당 방향을 가리키고 있어야 한다.

    초침이 1초에 1칸씩 움직이니까
    12에서 1까지가 5칸 총 60칸이 나온다
    그러면 60칸 중에서 
    분침도 60칸을 사용
    5칸 씩 나누면 시침이 되고 (60 / 5) => 12

    그러며어어어ㅓㄴ radius가 주어질 때 위치들을 이미 알 수 있는거 아닌가?
    radius는 시침 초침 분침 별로 조금씩 다르게 주면 되고
    거기서 부터 거리는 저기하면 되니까...
    아니 근데 rotate를 해야 시침 초침 분침이 표현이 되니까
    transform에서 translate보다는 rotate가 더 정확하게 표현이 되겠는데
    이제 transform origin은 중앙을 기준으로 잡고 rotate를 돌면...

    엥.. 그냥 저기로 그릴 수 있겠네 css...
    초기값은 js로 시작위치를 그려주고 거기서부터 360도씩 회전시킨다?

 */
class Hand {
  constructor(element, radius, unit = 6) {
    this._element = element;
    this._radius = radius;
    this._unit = unit;

    this._element.style.width = radius + 'px';
  }
  // 시간이 입력으로 주어지면 degree를 변경
  updatePosition(rotate) {
    // 근데 0도가 여기서는 가로니까
    // 세로 기준으로 잡으려면 -90도를 더한다.?
    this._element.style.transform = `rotate(${rotate - 90}deg)`;
  }
}
class SecondHand extends Hand {
  constructor(element, radius) {
    super(element, radius);
  }
  updatePosition(time) {
    super.updatePosition(time * this._unit);
  }
}
class MinuteHand extends Hand {
  constructor(element, radius) {
    super(element, radius);
  }
  updatePosition(time) {
    super.updatePosition(time * this._unit);
  }
}
class HourHand extends Hand {
  constructor(element, radius) {
    super(element, radius, 30);
  }
  updatePosition(time) {
    super.updatePosition(time * this._unit);
  }
}
class Clock {
  constructor(secondElement, minuteElement, hourElement, radius) {
    this._secondHand = new SecondHand(secondElement, radius);
    this._minuteHand = new MinuteHand(minuteElement, Math.floor(radius / 2));
    this._hourHand = new HourHand(hourElement, Math.floor(radius / 3));
    this._radius = radius;
  }
  updateTime() {
    const date = new Date();
    // 여기서 시간 분 초를 구하고
    const hh = date.getHours() % 12;
    const mm = date.getMinutes();
    const ss = date.getSeconds();

    // console.log({ date, hh, mm, ss });

    this._secondHand.updatePosition(ss);
    this._minuteHand.updatePosition(mm);
    this._hourHand.updatePosition(hh);
  }
}
