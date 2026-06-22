export function useScrollAreaStyles() {
  return {
    visible: true,
    barStyle: {
      background: 'rgba(0, 255, 136, 0.12)',
      borderRadius: '999px',
      pointerEvents: 'auto',
      cursor: 'grab',
      touchAction: 'none'
    },
    verticalBarStyle: {
      width: '12px'
    },
    horizontalBarStyle: {
      height: '12px'
    },
    thumbStyle: {
      background: 'rgba(0, 255, 136, 0.8)',
      borderRadius: '999px',
      boxShadow: '0 0 12px rgba(0, 255, 136, 0.22)',
      width: '12px',
      minHeight: '48px',
      pointerEvents: 'auto',
      cursor: 'grab',
      touchAction: 'none',
      zIndex: 10
    },
    verticalThumbStyle: {
      width: '12px',
      minHeight: '48px'
    },
    horizontalThumbStyle: {
      height: '12px',
      minWidth: '48px'
    },
    contentStyle: {
      backgroundColor: 'transparent'
    },
    contentActiveStyle: {
      backgroundColor: 'transparent'
    },
    delay: 1400
  }
}
