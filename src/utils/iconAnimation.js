const animationClassNames = {
  idle: 'icon-animation-idle',
  grow: 'icon-animation-grow',
  pulse: 'icon-animation-pulse',
}

export function getIconAnimationClass(animationName = 'idle') {
  return animationClassNames[animationName] || animationClassNames.idle
}
