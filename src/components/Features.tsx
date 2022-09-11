function Features() {
  return (
    <div>
      <h1 className="text-4xl text-gray-900">Features</h1>
      ...All of what is required in the task +
      <ul className="ml-8 mt-4 list-disc">
        <li>Ability to conrole the boxes from an input </li>
        <li>Ability to Drag and drop boxes inside others </li>
        <li>Everything is persisted in localStorage (even the input value...)</li>
        <li>Responsive</li>
      </ul>
    </div>
  );
}

export default Features;
