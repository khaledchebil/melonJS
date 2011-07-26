/* -----

	game object
		
	------			*/

	/************************************************************************************/
	/*																												*/
	/*		a player entity																					*/
	/*																												*/
	/************************************************************************************/
	var PlayerEntity = me.ObjectEntity.extend(
	{	

		init:function (x, y, settings)
		{
			// define this here, since not defined in tiled
			settings.image			= "alex_light";
			settings.spritewidth = 16;
			
			// call the constructor
			this.parent(x, y , settings);
			
			// set the walking & jumping speed
			this.setVelocity(2, 12);

			// adjust the bounding box
			this.updateColRect(1,14, -1,0);
						
			// set the display to follow our position on both axis
			me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
         
         // adjust the deadzone
         me.game.viewport.setDeadzone( me.game.viewport.width/6,  me.game.viewport.height/4);
			
		},
	
		
		/* -----

			update the player pos
			
		------			*/
		update : function ()
		{
				
			if (me.input.isKeyPressed('left'))
			{
				this.doWalk(true);
			}
			else if (me.input.isKeyPressed('right'))
			{
				this.doWalk(false);
			}
			else
			{
				this.vel.x = 0;
			}
			if (me.input.isKeyPressed('jump'))
			{	
				this.doJump();
			}
			
			// check & update player movement
			updated = this.updateMovement();
					
			// check for collision with other entities
			me.game.collide(this);
			
			// update animation
			if (updated)
			{
				// update objet animation
				this.parent(this);
			}
			return updated;
		}

	});