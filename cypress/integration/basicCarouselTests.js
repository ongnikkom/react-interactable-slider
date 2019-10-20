const carouselConfig = {
  cellAlign: "left",
  debug: true,
  dragEnabled: true,
  fullWidthPerSlide: false,
  marginGapsPerSlide: 4,
  navigationType: "both",
  widthPerSlide: 180
};

const carouselContainerSelector = '[data-testid="carousel-container"]';
const slideSelector = '[data-testid="slide"]';
const navigationArrowSelector = '[data-testid="navigation-arrow"]';

describe("rendering the carousel", () => {
  const { _, $ } = Cypress;

  beforeEach(() => {
    cy.visit("#");
  });

  /**
   * When window is resized, we want to check
   * whether the new container width is less than the large container width
   * because the container also gets resized after a window resize event
   * @type { number }
   */
  let largeContainerWidth;

  it("Shows the expected number of slides in the viewport", () => {
    cy.get(`${carouselContainerSelector}`, { timeout: 5000 }).should(
      $element => {
        expect($element.attr("dir")).to.eq("ltr");

        const containerWidth = $element.innerWidth();
        largeContainerWidth = containerWidth;

        // It's only case specific
        // The number of slides differ on the use case

        const noOfSlides = containerWidth / carouselConfig.widthPerSlide;

        expect(noOfSlides).to.be.greaterThan(7);
        expect(noOfSlides).to.be.lessThan(8);
      }
    );

    // MIMIC DRAG EVENT
    // cy.get(`${carouselContainerSelector}`, { timeout: 5000 })
    //   .trigger('mousedown', { which: 1, pageX: 300, pageY: 100 })
    //   .trigger('mousemove', { which: 1, pageX: 900, pageY: 100 })
    //   .trigger('mouseup')
  });

  it("Only changes the no of slides in the viewport after a resize", () => {
    cy.viewport(1024, 768);

    cy.get(`${carouselContainerSelector}`, { timeout: 2000 }).then($element => {
      const containerWidth = $element.innerWidth();
      expect(containerWidth).to.be.lessThan(largeContainerWidth);

      const slides = $element.find(`${slideSelector}`);
      _.forEach(slides, function(slide, index) {
        // All slides under the index of 6, (5 or below) will be visible in the viewport
        if (index < 6) {
          const $slide = $(slide);
          cy.isInViewport($slide);
        }

        // All slides above the index of 5 (6 or above) will not be visible in the viewport
        if (index > 5) {
          const $slide = $(slide);
          cy.isNotInViewport($slide);
        }
      });
    });
  });

  it("Doesn't leave extra spaces after reaching the end of the slide", () => {
    cy.get(`${carouselContainerSelector}`, { timeout: 2000 }).then($element => {
      const $arrows = $element.find(`${navigationArrowSelector}`);

      cy.wait(2000);

      // Trigger click on the right arrow

      // This is the number of clicks on the right arrow required to reach the end of the carousel
      // It is also dependent on the use case
      // If there are more slides, then the number of clicks required will be more
      // `$element` is an array containing both left and right arrow button elements.
      for (let i = 1; i <= 3; i++) {
        $arrows[1].click();
      }

      expect($arrows[1]).to.have.css("cursor", "not-allowed");

      const $slideElements = $element.find(`${slideSelector}`);
      const $lastElement = $slideElements[9];

      const completeCarouselWidth =
        $element[0].firstChild.firstChild.offsetWidth;

      // getBoundingClientRect gives the measurement w.r.t the viewport,
      // we want the position w.r.t the carousel container
      // hence we subtract the margin-left value
      // Since it's the last element, in the __'ltr'__ mode, margin-right won't be needed for this calculation
      // Math.ceil is used to remove any decimal values and round off the result to the ceil value
      const { x, width } = $lastElement.getBoundingClientRect();

      const positionOfLastSlideIncludingWidth = Math.ceil(x + width - 8);

      // We don't expect any extra gap between the last slide and the end of the carousel.
      expect(positionOfLastSlideIncludingWidth).to.eq(completeCarouselWidth);
    });
  });

  it("Should not show the navigation if the slides doesn't exceeds the container", () => {
    cy.get('[data-testid="btn-remove-slide"]').then($element => {
      for (let i = 1; i <= 3; i++) {
        $element.click();
      }
    });

    cy.get(`${carouselContainerSelector}`, { timeout: 2000 }).then($element => {
      const $slideElements = $element.find(`${slideSelector}`);
      const $lastElement = $slideElements[6];

      const { x, width } = $lastElement.getBoundingClientRect();
      const positionOfLastSlideIncludingWidth = Math.ceil(x + width - 8);

      expect(positionOfLastSlideIncludingWidth).to.lessThan($element.width());
    });

    cy.get(`${navigationArrowSelector}`).should("not.exist");
  });
});
