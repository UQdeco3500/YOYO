<template>
  <div class="heart-beat">
    <div class="title">Current</div>
    <div class="rate">
      <div class="heart">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_58_36)">
            <path
              d="M14.885 7.8301L14.115 7.1851C14.6835 6.50067 14.9964 5.63985 15 4.7501C14.9978 3.98208 14.7604 3.23317 14.3199 2.60409C13.8793 1.975 13.2566 1.49591 12.5357 1.23126C11.8147 0.966616 11.03 0.929097 10.287 1.12376C9.54409 1.31841 8.87857 1.73591 8.38 2.3201L8 2.7751L7.62 2.3201C7.12143 1.73591 6.45592 1.31841 5.71298 1.12376C4.97004 0.929097 4.18531 0.966616 3.46433 1.23126C2.74336 1.49591 2.12071 1.975 1.68015 2.60409C1.23958 3.23317 1.00222 3.98208 1 4.7501C1.00359 5.63985 1.31646 6.50067 1.885 7.1851L1.115 7.8301C0.394061 6.96571 -0.000549923 5.87567 5.75198e-07 4.7501C0.00235423 3.82457 0.274478 2.9198 0.783066 2.14654C1.29165 1.37327 2.01464 0.76504 2.86355 0.396298C3.71245 0.0275559 4.65044 -0.0857055 5.56271 0.0703761C6.47499 0.226458 7.32197 0.645111 8 1.2751C8.67959 0.643662 9.52887 0.224565 10.4435 0.0693245C11.358 -0.0859156 12.298 0.029468 13.1479 0.401291C13.9978 0.773114 14.7205 1.38517 15.2272 2.16222C15.7339 2.93927 16.0025 3.84744 16 4.7751C15.9947 5.89207 15.6005 6.97232 14.885 7.8301Z"
              fill="#fff"
            />
            <path
              d="M7.58 11.7901L5.92 8.19512L5.32 9.50012H0V8.50012H4.68L5.915 5.80512L7.465 9.15012L9.48 3.49512L11.33 8.50012H16V9.50012H10.63L9.5 6.42512L7.58 11.7901Z"
              fill="#fff"
            />
            <path
              d="M8.72999 16.0001H7.27L3.12 11.0801L3.88 10.4351L7.73 15.0001H8.27L12.115 10.4351L12.88 11.0801L8.72999 16.0001Z"
              fill="#fff"
            />
          </g>
          <defs>
            <clipPath id="clip0_58_36">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      {{ currentNum || "--" }}/min
    </div>
    <div class="title">Resting heart rate</div>
    <div class="rate">
      <div class="heart">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_58_36)">
            <path
              d="M14.885 7.8301L14.115 7.1851C14.6835 6.50067 14.9964 5.63985 15 4.7501C14.9978 3.98208 14.7604 3.23317 14.3199 2.60409C13.8793 1.975 13.2566 1.49591 12.5357 1.23126C11.8147 0.966616 11.03 0.929097 10.287 1.12376C9.54409 1.31841 8.87857 1.73591 8.38 2.3201L8 2.7751L7.62 2.3201C7.12143 1.73591 6.45592 1.31841 5.71298 1.12376C4.97004 0.929097 4.18531 0.966616 3.46433 1.23126C2.74336 1.49591 2.12071 1.975 1.68015 2.60409C1.23958 3.23317 1.00222 3.98208 1 4.7501C1.00359 5.63985 1.31646 6.50067 1.885 7.1851L1.115 7.8301C0.394061 6.96571 -0.000549923 5.87567 5.75198e-07 4.7501C0.00235423 3.82457 0.274478 2.9198 0.783066 2.14654C1.29165 1.37327 2.01464 0.76504 2.86355 0.396298C3.71245 0.0275559 4.65044 -0.0857055 5.56271 0.0703761C6.47499 0.226458 7.32197 0.645111 8 1.2751C8.67959 0.643662 9.52887 0.224565 10.4435 0.0693245C11.358 -0.0859156 12.298 0.029468 13.1479 0.401291C13.9978 0.773114 14.7205 1.38517 15.2272 2.16222C15.7339 2.93927 16.0025 3.84744 16 4.7751C15.9947 5.89207 15.6005 6.97232 14.885 7.8301Z"
              fill="#fff"
            />
            <path
              d="M7.58 11.7901L5.92 8.19512L5.32 9.50012H0V8.50012H4.68L5.915 5.80512L7.465 9.15012L9.48 3.49512L11.33 8.50012H16V9.50012H10.63L9.5 6.42512L7.58 11.7901Z"
              fill="#fff"
            />
            <path
              d="M8.72999 16.0001H7.27L3.12 11.0801L3.88 10.4351L7.73 15.0001H8.27L12.115 10.4351L12.88 11.0801L8.72999 16.0001Z"
              fill="#fff"
            />
          </g>
          <defs>
            <clipPath id="clip0_58_36">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      {{ restNum || "--" }}/min
    </div>
  </div>
</template>

<script>
export default {
  name: "heart-beat",
  props: {},
  data() {
    return {
      currentNum: 0,
      restNum: 0,
      timer1: null,
      timer2: null,
      timer: null,
    };
  },
  methods: {
    getNum() {
      const time = Math.floor(Math.random() * 5) + 1;

      setTimeout(() => {
        this.timer2 = setInterval(() => {
          const num1 = Math.floor(Math.random() * (90 - 61)) + 60;
          this.currentNum = num1;
          const num2 = Math.floor(Math.random() * 5) + 1;
          this.restNum = num1 - num2;
        }, 1500);
      }, time * 1000);

      this.$once("hook:beforeDestroy", function () {
        clearInterval(this.timer2);
      });
    },
  },
  mounted() {
    this.getNum();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.heart-beat {
  position: absolute;
  width: 100%;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0 4px;

  .rate {
    border-radius: 20px;
    background: #fc6f6f;
    margin-bottom: 18px;
    margin-top: 4px;
    width: 128px;
    box-sizing: border-box;
    padding: 12px 8px;
    color: #fff;
    display: flex;
    align-items: center;

    &:nth-last-child(1) {
      margin-bottom: 0;
    }
  }

  .heart {
    margin: 0 15px 0 15px;
    animation: sport 1s infinite;

    svg {
      margin-top: 6px;
    }
  }

  @keyframes sport {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
}
</style>
