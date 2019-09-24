## Demo

https://zniik.github.io/react-interactable-slider/

This was created for the purpose of properly showing product cards for ltr and rtl direction. It has some limitations or doesn't support the following feature:

- Autoplay
- Infinite slides
- Center aligned
- Image lazy loading (We can use 3rd party for now)
- Un-equal slides

## Supported Feature

Below are the supported feature with their default value.

```javascript
/**
 * Alignment of the slider
 * @param {'left'|'right'}
 */
cellAlign={'left'}

/**
 * Provide custom React Element for your arrows
 * It will wrap your component to a div with a class of
 * custom-left-arrrow and custom-right-arrow. Also, the
 * custom arrow will receive disabledArrow props so you
 * can handle css properly.
 * Make sure navigationType is set to arrows or both and it
 * will automatically show when slides exceeds the container width
 * @param {Element}
 */
customArrows={{ left: <LeftArrow />, right: <RightArrow />}}

/**
 * Toggle drag functionality
 * @param {Boolean}
 */
dragEnabled={true}

/**
 * Reveal debugging borders and snapPoints
 * around with your slider
 * @param {Boolean}
 */
debug={false}

/**
 * Type of navigation for the slider
 * @param {'arrows', 'both', 'dots', 'none'}
 */
navigationType={'none'}

/**
 * Turn each slide of the slider into full width
 * (widthPerSlide configuration is ignored if this property is true)
 * @param {Boolean}
 */
fullWidthPerSlide={false}

/**
 * The margin gaps between the slides
 * (Total in between, this case its value multiply by 2)
 * @param {Number}
 */
marginGapsPerSlide={4}

/**
 * Define the width of each slide
 * (This is ignored when fullWidthPerSlide property is true)
 * @param {Number}
 */
widthPerSlide={200}
```

## How to use the plugin

Build the slider and put your custom content or elements. Please take note that the slides should not have any inline/css style width. Instead, we will define that in our plugin configuration.

**_Important notes before creating your slider:_**

- Add borders to your element to visually see the width when building your initial slides.
- Make sure all `a`, `img` inside the slides is not using `display: inline` style (other display value is okay). These elements should have dimensions so that the slider will prevent drag conflicts with other draggable elements.

```javascript
import ReactInteractableSlider from 'react-interactable-slider';

const style = {
  height: 300,
  border: '1px solid #ddd'
};

function App() {
  return (
    <ReactInteractableSlider
      cellAlign="left"
      navigationType="dots"
      widthPerSlide={182}
      marginGapsPerSlide={4}
      debug={true}
    >
      <div style={style}>1</div>
      <div style={style}>2</div>
      <div style={style}>3</div>
      <div style={style}>4</div>
      <div style={style}>5</div>
      ...
    </ReactInteractableSlider>
  );
}
```

## Dynamic Slides

```javascript
import ReactInteractableSlider from 'react-interactable-slider';

const [slides, setSlides] = useState(Array.from(Array(10).keys()));

const style = {
  height: 300,
  border: '1px solid #ddd'
};

function App() {
  return (
    <>
      <button onClick={() => setSlides([...slides, slides.length])}>Add 1 slide</button>
      <button onClick={() => setSlides(slides.slice(0, -1))}>Remove 1 slide</button>
      <ReactInteractableSlider debug={true} navigationType={'both'}>
        {slides.map(v => (
          <div style={style} key={v}>
            {v + 1}
          </div>
        ))}
      </ReactInteractableSlider>
    </>
  );
}
```
