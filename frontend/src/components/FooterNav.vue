<template>
  <div class="footer-container" v-if="!$route.meta.hideNavigation">
    <footer class="footer-content">
      <div class="logo-container">
        <router-link to="/home">
          <img class="yellow-footer-logo" src="../assets/ros-logo-yellow.svg" alt="yellow logo"/>
        </router-link>
        <p class="desktop-footer">Copyright &copy; 2020</p>
        <p class="desktop-footer">Rags of Style</p>
      </div>
      <div class="desktop-footer">
        <div>
          <ul>
            <li class="header-for-footer"><a>FAQs</a></li>
            <li><a class="footer-link">Payment</a></li>
            <li><a class="footer-link">Shipping</a></li>
            <li><a class="footer-link">Returns, Exchanges, and Cancellations</a></li>
          </ul>
        </div>
        <div>
          <ul>
            <li class="header-for-footer"><a>Legal</a></li>
            <li><a class="footer-link">Terms of Service</a></li>
            <li><a class="footer-link">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <ul>
            <li class="header-for-footer"><a>Contact</a></li>
          </ul>
        </div>
        <div>
          <ul>
            <li class="header-for-footer follow-us">Follow Us On Instagram</li>
            <li><a class="footer-link" href="https://www.instagram.com/ragsofstyle/">@ragsofstyle</a></li>
          </ul>
        </div>
      </div>
      <div class="mobile-footer">
        <div class="mobile-footer-content">
          <a>FAQs</a>
          <a>Legal</a>
          <a>Contact</a>
        </div>
        <div>
          <img class="insta-icon" src="../assets/insta-icon.svg"/>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'FooterNav',
  data () {
    return {
      links: [
        {

        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Shrikhand&display=swap');

.footer-container {
  padding: 2rem 3rem;
  clear: both;
  background-color: #252422;

  .footer-content {
    text-align: center;
    color: white;

    .desktop-footer {
      display: none;
    }

    a {
      color: white;
    }

    .footer-link {
      font-size: .8rem;
      font-family: 'Inconsolata';
    }

    p {
      font-size: .8rem;
      margin: 0;
    }

    .header-for-footer {
      margin-bottom: 15px;
    }

    .follow-us {
      font-family: 'Shrikhand', cursive;
    }

    .yellow-footer-logo {
      margin-bottom: 10px;
      height: 60px;
    }
  }
  .mobile-footer {
    &-content {
      padding-bottom: 20px;
      a {
        width: 33%;

        &:not(:last-child) {
          padding: 10px;
        }
      }
    }

    .insta-icon {
      height: 40px;
    }
  }
}

@media (min-width: 768px) {
  .footer-container {
    padding: 3rem 8rem;
    font-size: 100%;
    background-color: #252422;

    .footer-content {
      display: flex;
      justify-content: space-between;
      color: white;

      .mobile-footer {
        display: none;
      }

      .logo-container {
        width: 25%;
        text-align: left;
      }

      .desktop-footer {
        display: flex;
        width: 75%;
        text-align: left;

        div {
          width: 25%;
          a {
            color: white;
          }

          .footer-link {
            font-size: .8rem;
            font-family: 'Inconsolata';
          }

          p {
            font-size: .8rem;
            margin: 0;
          }

          .header-for-footer {
            margin-bottom: 15px;
          }

          .follow-us {
            font-family: 'Shrikhand', cursive;
          }

          .yellow-footer-logo {
            margin-bottom: 10px;
            height: 60px;
          }
        }
      }
    }
  }
}

</style>
