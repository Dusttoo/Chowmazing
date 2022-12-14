"""added address table

Revision ID: 7308b83a9a6f
Revises: e97cc4eecb55
Create Date: 2022-10-07 10:56:32.811260

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '7308b83a9a6f'
down_revision = 'e97cc4eecb55'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'updated_at')
    op.drop_column('users', 'created_at')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('created_at', postgresql.TIMESTAMP(timezone=True), server_default=sa.text('now()'), autoincrement=False, nullable=True))
    op.add_column('users', sa.Column('updated_at', postgresql.TIMESTAMP(timezone=True), autoincrement=False, nullable=True))
    # ### end Alembic commands ###
