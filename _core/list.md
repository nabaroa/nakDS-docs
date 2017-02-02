---
title: List
position: 3
css_path: components/list.css  
description: The class .nak-l-list is used to create lists. Can be used for text or components.
type: layout
right_content:
right_code: |

---
<p>adfad</p>

~~~ html
<ul class="nak-l-list">
  <li>The face of the moon was in shadow.</li>
  <li>My two natures had memory in common.</li>
  <li>Waves flung themselves at the blue evening.</li>
  <li>I watched the storm, so beautiful yet terrific.</li>
</ul>
~~~
{: title="nak-list" }
~~~ html
<ul class="nak-l-list--dotted">
  <li>The face of the moon was in shadow.</li>
  <li>My two natures had memory in common.</li>
  <li>Waves flung themselves at the blue evening.</li>
  <li>I watched the storm, so beautiful yet terrific.</li>
</ul>
~~~
{: title="nak-list--dotted" }


<div class="nak-grid">
  <ul class="nak-l-list">
    <li>The face of the moon was in shadow.</li>
    <li>My two natures had memory in common.</li>
    <li>Waves flung themselves at the blue evening.</li>
    <li>I watched the storm, so beautiful yet terrific.</li>
  </ul>
  <ul class="nak-l-list--dotted">
    <li>The face of the moon was in shadow.</li>
    <li>My two natures had memory in common.</li>
    <li>Waves flung themselves at the blue evening.</li>
    <li>I watched the storm, so beautiful yet terrific.</li>
  </ul>
</div>


<div class="nak-grid">
<div class="nak-l-list">
	<div class="nak-box">box</div>
	<div class="nak-box">box</div>
	<div class="nak-box">box</div>
	<div class="nak-box">box</div>
	<div class="nak-box">box</div>
</div>
<div class="nak-l-list--horizontal">
	<div class="nak-box">box</div>
	<div class="nak-box">box</div>
	<div class="nak-box">box</div>
	<div class="nak-box">box</div>
	<div class="nak-box">box</div>
</div>
</div>

~~~ html
<ul class="nak-l-list">
  <div class="nak-l-list">
  	<div class="nak-box">box</div>
  	<div class="nak-box">box</div>
  	<div class="nak-box">box</div>
  	<div class="nak-box">box</div>
  	<div class="nak-box">box</div>
  </div>
</ul>
~~~

~~~ html
<ul class="nak-l-list--horizontal">
  <div class="nak-l-list">
  	<div class="nak-box">box</div>
  	<div class="nak-box">box</div>
  	<div class="nak-box">box</div>
  	<div class="nak-box">box</div>
  	<div class="nak-box">box</div>
  </div>
</ul>
~~~
